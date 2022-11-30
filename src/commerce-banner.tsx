import {
  Module,
  Panel,
  Image,
  Input,
  Upload,
  Control,
  customElements,
  customModule,
  Modal,
  RadioGroup,
  Label,
  Button,
  HStack,
} from "@ijstech/components";
import { PageBlock } from "./pageBlock.interface";
import './commerce-banner.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["i-section-commerce-banner"]: CommerceBannerBlock;
    }
  }
}

const alignItems = [
  {
    caption: "Left",
    value: "left",
    checked: true,
  },
  {
    caption: "Center",
    value: "center",
    checked: false,
  },
  {
    caption: "Right",
    value: "right",
    checked: false,
  },
];

const autoItems = [
  {
    caption: "Fullwidth",
    value: "fullwidth",
    checked: false,
  },
  {
    caption: "Auto Width",
    value: "auto-width",
    checked: false,
  },
  {
    caption: "Auto Height",
    value: "auto-height",
    checked: false,
  },
];

interface BannerPage {
  background?: any,
  goodsImg?: any,
  title?: String,
  content?: String,
  price?: number
}

interface confirmData {

}

@customModule
@customElements("i-section-commerce-banner")
export class CommerceBannerBlock extends Module implements PageBlock {
  private data: any[] = [{}]
  private confirmData: BannerPage[] = [];
  private mdConfig: Modal;
  private widthElm: Input;
  private heightElm: Input;
  private alignElm: RadioGroup;
  private autoElm: RadioGroup;
  private titleInput: Input;
  private contentInput: Input;
  private priceInput: Input;
  private bannerPage: Panel;
  private configPage: Panel;
  private currentPageLabel: Label;
  private leftBtn: Button;
  private rightBtn: Button;
  private configLeftBtn: Button;
  private configAddBtn: Button;
  private configDeleteBtn: Button;
  private configRightBtn: Button;


  private backgroundUploaderWrapper: Panel;
  private goodsImgUploaderWrapper: Panel;

  private backgroundUploaderList: Upload[] = [{} as Upload];
  private goodsImgUploaderList: Upload[] = [{} as Upload];

  private tempBackgroud: any;
  private tempGoodsImg: any;
  private dotPanel: HStack;

  // params for flow control
  private bannerPageList: BannerPage[] = [{} as BannerPage];
  private currentPage: number = 0;

  tag: any = {};
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  async init() {
    super.init();
    this.preConfig();
    this.currentPage = 0;
  }

  async getData() {
    return this.data;
  }

  async setData(value: any) {

    this.data = this.shallowCopyList(value)
    this.renderBanner();
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
    this.tag = value;
    this.widthElm.value = value.width;
    this.heightElm.value = value.height;
    this.alignElm.selectedValue = value.align;
    this.autoElm.selectedValue = value.auto;
  }

  async edit() {

    this.bannerPageList = this.shallowCopyList(this.data)

    this.renderConfigPnl();
    this.configPage.visible = true;
    this.bannerPage.visible = false;
  }

  shallowCopyList(targetList: BannerPage[]) {
    let newList = [] as BannerPage[];
    for(let i=0; i<targetList.length; i++) {
      newList.push({
        background: targetList[i].background,
        goodsImg: targetList[i].goodsImg,
        title: targetList[i].title,
        content: targetList[i].content,
        price: targetList[i].price,
      })

      newList[i].background = (targetList[i].hasOwnProperty('background'))? targetList[i].background : ""
      newList[i].goodsImg = (targetList[i].hasOwnProperty('goodsImg'))? targetList[i].goodsImg : ""
      newList[i].title = (targetList[i].hasOwnProperty('title'))? targetList[i].title : ""
      newList[i].content = (targetList[i].hasOwnProperty('content'))? targetList[i].content : ""
      newList[i].price = (targetList[i].hasOwnProperty('price'))? targetList[i].price : 0;
    }
    return newList;
  }

  async confirm() {

    console.log("confirm")
    this.confirmData = this.shallowCopyList(this.bannerPageList);

    await this.setData(this.confirmData);

    this.consoleLog();

    // this.bannerPageList = []

    this.consoleLog();

    this.renderBanner();
    this.configPage.visible = false;
    this.bannerPage.visible = true;
  }

  async discard() {

    console.log("discard")
    this.bannerPageList = this.shallowCopyList(this.confirmData)

    if(this.currentPage >= this.confirmData.length-1) {
      this.currentPage = this.confirmData.length-1;
    }

    this.consoleLog()

    this.renderBanner();
    this.configPage.visible = false;
    this.bannerPage.visible = true;
  }

  async config() {
    this.mdConfig.visible = true;
  }

  async onConfigCancel() {
    this.mdConfig.visible = false;
  }

  async onConfigSave() {

    this.tag.width = this.widthElm.value;
    this.tag.height = this.heightElm.value;
    this.tag.align = this.alignElm.selectedValue;
    this.tag.auto = this.autoElm.selectedValue;

    this.mdConfig.visible = false;
  }

  validate(): boolean {
    console.log("validate")
    return true;
  }

  onChangeAlign(source: Control, event: Event) {
    console.log("align: ", (source as RadioGroup).selectedValue);
  }

  onChangeAuto(source: Control, event: Event) {
    console.log("auto: ", (source as RadioGroup).selectedValue);
  }

  async consoleLog(){
    console.log("bannerList: ", this.bannerPageList)
    console.log("confirmedData: ", this.confirmData)
    console.log("this.data: ", await this.getData())
  }

  async handleBackgroundUploaderOnChange(control: Control, files: any[]) {

    if (files && files[0]) {

      const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      this.tempBackgroud = await toBase64(files[0])
      this.setBackgroundImg();
    }
  }

  setBackgroundImg() {
    this.bannerPageList[this.currentPage].background = this.tempBackgroud;
  }

  async handleImgUploaderOnChange(control: Control, files: any[]) {

    if (files && files[0]) {

      const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      this.tempGoodsImg = await toBase64(files[0])
      this.setGoodsImg();
    }
  }

  setGoodsImg() {
    this.bannerPageList[this.currentPage].goodsImg = this.tempGoodsImg;
  }

  preConfig() {
    this.currentPageLabel.caption = `Current page is 1 / 1`;
    this.backgroundUploaderList[0] =
      <i-upload
        width={'300px'}
        height={'300px'}
        caption={"Upload background image here"}
        border={{ width: 1, style: 'dashed' }}
        onChanged={this.handleBackgroundUploaderOnChange}
      ></i-upload>

    this.goodsImgUploaderList[0] =
      <i-upload
        width={'300px'}
        height={'300px'}
        caption={"Upload goods image here"}
        border={{ width: 1, style: 'dashed' }}
        onChanged={this.handleImgUploaderOnChange}
      ></i-upload>
  }

  renderBanner() {
    this.bannerPage.innerHTML = "";

    if (this.data[this.currentPage].background && this.data[this.currentPage].background != "") {
      this.bannerPage.style.backgroundImage = "linear-gradient(to bottom, rgb(0 0 0 / 6%), rgb(0 0 0 / 80%)),url(" + this.data[this.currentPage].background + ")";
    } else {
      this.bannerPage.style.background = 'none';
    }
    this.bannerPage.style.backgroundSize = "100% auto";

    this.bannerPage.append(

      <i-hstack width={'100%'} verticalAlignment="center">

        <i-hstack id="leftBtn" class='changePageBtn pointer' width='3%' height={'50px'} verticalAlignment="center" horizontalAlignment="center">
          <i-icon name="angle-left" width='20px' height='20px' fill={'white'} ></i-icon>
        </i-hstack>

        <i-vstack width='94%'>

          <i-hstack width="100%" horizontalAlignment="center">

            <i-vstack width="50%" gap={10} padding={{ left: '3rem', top: '4rem', right: '2rem', bottom: '2rem' }} minHeight={300}>
              <i-vstack width='100%' gap={10}>
                <i-label caption={(this.data[this.currentPage].title) ? (this.data[this.currentPage].title + "") : ""} font={{ bold: true, size: '40px', color: 'white' }}
                  overflowWrap={'break-word'}></i-label>
                <i-label caption={(this.data[this.currentPage].content) ? (this.data[this.currentPage].content + "") : ""} font={{ color: 'white' }}></i-label>
              </i-vstack>
              <i-hstack width='100%' gap={10} verticalAlignment="center" margin={{ top: '3rem' }}>
                <i-button caption={"Add to cart"} icon={{ name: "shopping-cart" }} font={{ color: 'black' }} background={{ color: 'white' }}
                  padding={{ top: 13, right: 24, bottom: 12, left: 24 }} visible={((this.data[this.currentPage].price) ? true : false)} />
                <i-label caption={(this.data[this.currentPage].price && this.data[this.currentPage].price!=-1) ? "Starting at $" + this.data[this.currentPage].price : ""} font={{ color: 'white' }}></i-label>
              </i-hstack>
            </i-vstack>

            <i-vstack width="50%" padding={{ left: '3rem', top: '4rem', right: '2rem', bottom: '2rem' }}>
              <i-image url={(this.data[this.currentPage].goodsImg) ? this.data[this.currentPage].goodsImg : null}></i-image>
            </i-vstack>

          </i-hstack>

          <i-hstack id="dotPanel" width="100%" horizontalAlignment="center" margin={{ bottom: '1.5rem' }} />

        </i-vstack>

        <i-hstack id="rightBtn" class='changePageBtn pointer' width='3%' height={'50px'} verticalAlignment="center" horizontalAlignment="center">
          <i-icon name="angle-right" width='20px' height='20px' fill={'white'} ></i-icon>
        </i-hstack>

      </i-hstack>
    )

    // render dot panel
    for (let i = 0; i < this.data.length; i++) {
      if (i != this.currentPage) {
        this.dotPanel.append(
          <i-icon class="pointer" name="dot-circle" margin={{ left: 2, right: 2 }} width='20px' height='20px' fill={'black'} onClick={() => { this.currentPage = i; this.renderBanner(); }}></i-icon>
        )
      } else {
        this.dotPanel.append(
          <i-icon name="dot-circle" margin={{ left: 2, right: 2 }} width='20px' height='20px' fill={'grey'}></i-icon>
        )
      }
    }

    // add click handler to buttons
    this.leftBtn.onClick = () => {
      if (this.currentPage != 0) {
        this.currentPage--;
        this.renderBanner();
      } else {
        this.currentPage = this.bannerPageList.length - 1;
        this.renderBanner();
      }
    }

    this.rightBtn.onClick = () => {
      if (this.currentPage != this.bannerPageList.length - 1) {
        this.currentPage++;
        this.renderBanner();
      } else {
        this.currentPage = 0;
        this.renderBanner();
      }
    }
  }

  navToPrevPage() {
    this.currentPage = (this.currentPage != 0) ? this.currentPage - 1 : 0;
    this.renderConfigPnl();
  }

  navToNextPage() {
    this.currentPage = (this.currentPage < this.bannerPageList.length - 1) ? this.currentPage + 1 : this.currentPage;
    this.renderConfigPnl();
  }

  addPage() {

    this.currentPageLabel.caption = `Current page is ${this.currentPage + 1} / ${this.bannerPageList.length + 1}`;
    this.bannerPageList.push(
      {} as BannerPage
    )

    if (this.backgroundUploaderList.length <= this.currentPage) {
      this.backgroundUploaderList.push(
        <i-upload
          width={'300px'}
          height={'300px'}
          caption={"Upload background image here"}
          border={{ width: 1, style: 'dashed' }}
          onChanged={this.handleBackgroundUploaderOnChange}
        ></i-upload>
      )
    }

    if (this.goodsImgUploaderList.length <= this.currentPage) {
      this.goodsImgUploaderList.push(
        <i-upload
          width={'300px'}
          height={'300px'}
          caption={"Upload goods image here"}
          border={{ width: 1, style: 'dashed' }}
          onChanged={this.handleImgUploaderOnChange}
        ></i-upload>
      )
    }

    this.renderConfigPnl();
  }

  removePage() {
    let deletePage = this.currentPage;

    if (this.bannerPageList.length != 1) {

      if (deletePage == this.bannerPageList.length - 1) {
        this.currentPage--;
      }

      let tempItem = this.bannerPageList[deletePage]
      this.bannerPageList = this.bannerPageList.filter(item => item != tempItem)

      tempItem = this.backgroundUploaderList[deletePage]
      this.backgroundUploaderList = this.backgroundUploaderList.filter(item => item != tempItem)

      tempItem = this.goodsImgUploaderList[deletePage]
      this.goodsImgUploaderList = this.goodsImgUploaderList.filter(item => item != tempItem)

    }
    this.renderConfigPnl()
  }

  renderConfigPnl() {

    this.configLeftBtn.opacity = (this.currentPage == 0) ? 0.5 : 1;
    this.configRightBtn.opacity = (this.currentPage == this.bannerPageList.length - 1) ? 0.5 : 1;
    this.configDeleteBtn.opacity = (this.bannerPageList.length == 1) ? 0.5 : 1;

    this.currentPageLabel.caption = `Current page is ${this.currentPage + 1} / ${this.bannerPageList.length}`;
    this.titleInput.value = this.bannerPageList[this.currentPage].title;
    this.contentInput.value = this.bannerPageList[this.currentPage].content;
    this.priceInput.value = this.bannerPageList[this.currentPage].price;

    if (this.backgroundUploaderList.length <= this.currentPage) {
      this.backgroundUploaderList.push(
        <i-upload
          width={'300px'}
          height={'300px'}
          caption={"Upload background image here"}
          border={{ width: 1, style: 'dashed' }}
          onChanged={this.handleBackgroundUploaderOnChange}
        ></i-upload>
      )
    }

    this.backgroundUploaderWrapper.innerHTML = "";
    this.backgroundUploaderWrapper.append(
      this.backgroundUploaderList[this.currentPage]
    )


    if (this.goodsImgUploaderList.length <= this.currentPage) {
      this.goodsImgUploaderList.push(
        <i-upload
          width={'300px'}
          height={'300px'}
          caption={"Upload goods image here"}
          border={{ width: 1, style: 'dashed' }}
          onChanged={this.handleImgUploaderOnChange}
        ></i-upload>
      )
    }

    this.goodsImgUploaderWrapper.innerHTML = "";
    this.goodsImgUploaderWrapper.append(
      this.goodsImgUploaderList[this.currentPage]
    )
  }

  setTitle() {
    this.bannerPageList[this.currentPage].title = this.titleInput.value
  }

  setContent() {
    this.bannerPageList[this.currentPage].content = this.contentInput.value
  }

  setPrice() {
    this.bannerPageList[this.currentPage].price = this.priceInput.value
    console.log("setPrice")
    console.log(this.bannerPageList)
    console.log(this.confirmData)
  }

  render() {
    return (
      <i-panel>
        <i-modal
          id={"mdConfig"}
          showBackdrop={true}
          background={{ color: "#FFF" }}
          maxWidth={"500px"}
          popupPlacement={"center"}
          closeIcon={{ name: "times", fill: "#aaa" }}
        >
          <i-hstack justifyContent={"start"} alignItems={"start"}>

            <i-panel width={"30%"} padding={{ top: 5, bottom: 5, left: 5, right: 5 }}>
              <i-input id={"widthElm"} caption={"Width"} width={"100%"} captionWidth={"46px"} />
            </i-panel>

            <i-panel width={"30%"} padding={{ top: 5, bottom: 5, left: 5, right: 5 }} >
              <i-input id={"heightElm"} caption={"Height"} width={"100%"} captionWidth={"50px"} />
            </i-panel>

            <i-panel width={"40%"} padding={{ top: 5, bottom: 5, left: 5, right: 5 }} >
              <i-label width={100} caption="Align" margin={{ bottom: 8 }} />
              <i-radio-group id="alignElm" width={"100%"} selectedValue="left" radioItems={alignItems} onChanged={this.onChangeAlign} display="block" />
            </i-panel>

          </i-hstack>

          <i-hstack justifyContent={"start"} alignItems={"center"}>
            <i-panel width={"100%"} padding={{ top: 5, bottom: 5, left: 5, right: 5 }} >
              <i-label width={100} caption="Auto" margin={{ bottom: 8 }} />
              <i-radio-group id="autoElm" width={"100%"} selectedValue="left" radioItems={autoItems} onChanged={this.onChangeAuto} display="block" />
            </i-panel>
          </i-hstack>

          <i-hstack justifyContent={"end"} alignItems={"center"} padding={{ top: 5, bottom: 5 }}>
            <i-button
              caption={"Cancel"}
              padding={{ top: 5, bottom: 5, left: 10, right: 10 }}
              font={{ color: "white" }}
              background={{ color: "#B2554D" }}
              icon={{ name: "times", fill: "#FFF" }}
              onClick={this.onConfigCancel}
            ></i-button>
            <i-button
              caption={"Save"}
              padding={{ top: 5, bottom: 5, left: 10, right: 10 }}
              icon={{ name: "save", fill: "#FFF" }}
              onClick={this.onConfigSave}
              margin={{ left: 5 }}
              font={{ color: "white" }}
              background={{ color: "#77B24D" }}
            ></i-button>
          </i-hstack>
        </i-modal>
        <i-panel width='100%'>

          <i-panel id='configPage' width='100%'>

            <i-hstack width='100%' horizontalAlignment="center" padding={{ left: '1rem', top: '1rem', right: '1rem', bottom: '1rem' }}>

              <i-vstack gap={5} margin={{ top: 20, bottom: 20 }} width={'40%'}>
                <i-input id='titleInput' inputType="textarea" placeholder="Input the title here" width={'100%'} height={100} onChanged={this.setTitle}></i-input>
                <i-input id='contentInput' inputType="textarea" placeholder="Input the content here" width={'100%'} height={300} onChanged={this.setContent}></i-input>
                <i-input id='priceInput' inputType="textarea" placeholder="Input the price here" width={'100%'} onChanged={this.setPrice}></i-input>
              </i-vstack>

              <i-hstack gap={5} verticalAlignment="center" padding={{ left: '1rem' }}>
                <i-panel id={"backgroundUploaderWrapper"} />
                <i-panel id={"goodsImgUploaderWrapper"} />
              </i-hstack>

            </i-hstack>

            <i-hstack width='100%' horizontalAlignment="center" verticalAlignment="end" margin={{ top: '1rem', bottom: '1rem' }}>
              <i-label id="currentPageLabel"></i-label>
            </i-hstack>

            <i-hstack width='100%' horizontalAlignment="center" verticalAlignment="end" gap={7} margin={{ bottom: '1rem' }}>
              <i-button id="configLeftBtn" icon={{ name: 'arrow-left' }} width={100} height={50} onClick={this.navToPrevPage} />
              <i-button id="configAddBtn" icon={{ name: 'plus' }} width={100} height={50} onClick={this.addPage} />
              <i-button id="configDeleteBtn" icon={{ name: 'times-circle' }} width={100} height={50} onClick={this.removePage} />
              <i-button id="configRightBtn" icon={{ name: 'arrow-right' }} width={100} height={50} onClick={this.navToNextPage} />
            </i-hstack>

          </i-panel>

          <i-panel id='bannerPage' width='100%' visible={false} minHeight={300} />

        </i-panel>
      </i-panel>
    );
  }
}
