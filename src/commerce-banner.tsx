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

@customModule
@customElements("i-section-commerce-banner")
export class CommerceBannerBlock extends Module implements PageBlock {
  private data: any;
  private mdConfig: Modal;
  private widthElm: Input;
  private heightElm: Input;
  private alignElm: RadioGroup;
  private autoElm: RadioGroup;
  private pnlBanner: Panel;
  private backgroundUploader: Upload;
  private goodsImgUploader: Upload;
  private titleInput: Input;
  private contentInput: Input;
  private priceInput: Input;
  private bannerPage: Panel;
  private configPage: Panel;
  private currentPageLabel: Label;

  private tempBackgroud: any;
  private tempGoodsImg: any;
  private temptitle: String;
  private tempcontent: String;
  private tempprice: String;

  // params for flow control
  // private numberOfPage: number = 1;
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
    // this.renderConfigPnl();
  }

  async getData() {
    return this.data;
  }

  async setData(value: any) {
    // console.log("set data");
  }

  onLoad() {
    console.log("onload")
    // this.renderConfigPnl();
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
    console.log("edit");
    this.configPage.visible = true;
    this.bannerPage.visible = false;
  }

  async confirm() {
    console.log("confirm");
    this.renderBanner();
    this.configPage.visible = false;
    this.bannerPage.visible = true;
  }

  async discard() {
    console.log("discard = comfirm");

    this.setBannerItem();
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
    // console.log("onConfigSave");
    this.tag.width = this.widthElm.value;
    this.tag.height = this.heightElm.value;
    this.tag.align = this.alignElm.selectedValue;
    this.tag.auto = this.autoElm.selectedValue;

    this.mdConfig.visible = false;
  }

  validate(): boolean {
    return !!this.data;
  }

  onChangeAlign(source: Control, event: Event) {
    console.log("align: ", (source as RadioGroup).selectedValue);
  }

  onChangeAuto(source: Control, event: Event) {
    console.log("auto: ", (source as RadioGroup).selectedValue);
  }

  async handleBackgroundUploaderOnChange(control: Control, files: any[]) {
    if (files && files[0]) {
      this.tempBackgroud = await this.backgroundUploader.toBase64(files[0]);
    }
  }

  async handleImgUploaderOnChange(control: Control, files: any[]) {
    if (files && files[0]) {
      this.tempGoodsImg = await this.goodsImgUploader.toBase64(files[0]);
    }
  }

  preConfig() {
    this.currentPageLabel.caption = `Current page is 1 / 1`;
  }

  setBannerItem() {
    // console.log("setBannerItem: page: " + this.currentPage)
    let item = {

      background: this.tempBackgroud,
      goodsImg: this.tempGoodsImg,
      title: this.titleInput.value,
      content: this.contentInput.value,
      price: this.priceInput.value

    } as BannerPage;

    // check if it is new page
    if (this.bannerPageList.length < this.currentPage + 1) {
      console.log("setting new page")
      this.bannerPageList.push(item)
    } else {
      console.log("setting old page")
      this.bannerPageList[this.currentPage] = item;
    }

    // console.log(this.bannerPageList)
  }

  resetConfigPnl() {
    this.titleInput.value = "";
    this.contentInput.value = "";
    this.priceInput.value = "";
  }

  renderBanner() {
    this.bannerPage.innerHTML = "";
    // this.bannerPage.background.image = this.bannerPageList[this.currentPage].background;
    this.bannerPage.style.backgroundImage = "linear-gradient(to bottom, rgb(0 0 0 / 6%), rgb(0 0 0 / 80%)),url(" + this.bannerPageList[this.currentPage].background + ")";

    this.bannerPage.append(

      <i-hstack width='100%'>

        <i-vstack width="50%" gap={10} padding={{ left: '3rem', top: '4rem', right: '2rem', bottom: '2rem' }} minHeight={300}>
          <i-vstack width='100%' gap={10}>
            <i-label caption={this.bannerPageList[this.currentPage].title + ""} font={{ bold: true, size: '40px', color: 'white' }} overflowWrap={'break-word'}></i-label>
            <i-label caption={this.bannerPageList[this.currentPage].content + ""} font={{ color: 'white' }}></i-label>
          </i-vstack>
          <i-hstack width='100%' gap={10} verticalAlignment="center" margin={{ top: '3rem' }}>
            <i-button caption={"Add to cart"} icon={{ name: "shopping-cart" }} font={{ color: 'black' }} background={{ color: 'white' }} padding={{ top: 13, right: 24, bottom: 12, left: 24 }} />
            <i-label caption={"Starting at $" + this.bannerPageList[this.currentPage].price} font={{ color: 'white' }}></i-label>
          </i-hstack>
        </i-vstack>

        <i-vstack width="50%" padding={{ left: '3rem', top: '4rem', right: '2rem', bottom: '2rem' }}>
          <i-image url={this.bannerPageList[this.currentPage].goodsImg}></i-image>
        </i-vstack>

      </i-hstack>
    )
  }

  navToPrevPage() {
    this.setBannerItem();
    this.currentPage = (this.currentPage != 0) ? this.currentPage - 1 : 0;
    console.log("navToPrevPage: page " + (this.currentPage + 1));
    // this.resetConfigPnl();
    this.renderConfigPnl();

    // this.renderBanner();
  }

  navToNextPage() {
    this.setBannerItem()
    this.currentPage = (this.currentPage < this.bannerPageList.length - 1) ? this.currentPage + 1 : this.currentPage;
    // console.log("navToNextPage: page " + (this.currentPage + 1));
    // this.resetConfigPnl();
    this.renderConfigPnl();
    // this.renderBanner();
  }

  addPage() {
    console.log("addPage")
    this.setBannerItem()
    this.currentPageLabel.caption = `Current page is ${this.currentPage + 1} / ${this.bannerPageList.length + 1}`;
    this.bannerPageList.push(
      {} as BannerPage
    )
  }

  removePage() {
    // this.setBannerItem()
    let deletePage = this.currentPage;

    if (this.bannerPageList.length != 1) {

      if (deletePage == this.bannerPageList.length-1) {
        this.currentPage--;
      } 

      let tempItem = this.bannerPageList[deletePage]
      this.bannerPageList = this.bannerPageList.filter(item => item != tempItem)
      
    }
    this.renderConfigPnl()
  }

  renderConfigPnl() {
    console.log(this.bannerPageList)
    console.log(this.currentPage)

    this.currentPageLabel.caption = `Current page is ${this.currentPage + 1} / ${this.bannerPageList.length}`;
    this.titleInput.value=this.bannerPageList[this.currentPage].title;
    this.contentInput.value=this.bannerPageList[this.currentPage].content;
    this.priceInput.value=this.bannerPageList[this.currentPage].price;
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
        <i-panel id={"pnlBanner"} width='100%'>

          <i-panel id='configPage' width='100%'>
            <i-vstack width='100%' horizontalAlignment="center">

              <i-hstack gap={5} verticalAlignment="center">
                <i-label id="currentPageLabel"></i-label>
                <i-upload
                  width={'300px'}
                  height={'300px'}
                  id={"backgroundUploader"}
                  caption={"Upload background image here"}
                  border={{ width: 1, style: 'dashed' }}
                  onChanged={this.handleBackgroundUploaderOnChange}
                ></i-upload>
                <i-upload
                  width={'300px'}
                  height={'300px'}
                  id={"goodsImgUploader"}
                  caption={"Upload goods image here"}
                  border={{ width: 1, style: 'dashed' }}
                  onChanged={this.handleImgUploaderOnChange}
                ></i-upload>
              </i-hstack>

              <i-hstack gap={5} margin={{ top: 20, bottom: 20 }}>
                <i-input id='titleInput' inputType="textarea" placeholder="Input the title here" width={500} height={300} ></i-input>
                <i-input id='contentInput' inputType="textarea" placeholder="Input the content here" width={500} height={300} ></i-input>
                <i-input id='priceInput' inputType="number" border={{ width: 1, style: 'solid' }} placeholder="Input the price here" width={300} ></i-input>
              </i-hstack>

              <i-hstack width='100%' horizontalAlignment="center" verticalAlignment="end" gap={7} margin={{ bottom: '1 rem' }}>
                <i-button icon={{ name: 'arrow-left' }} width={100} height={50} onClick={this.navToPrevPage} />
                <i-button icon={{ name: 'plus' }} width={100} height={50} onClick={this.addPage} />
                <i-button icon={{ name: 'minus' }} width={100} height={50} onClick={this.removePage} />
                <i-button icon={{ name: 'arrow-right' }} width={100} height={50} onClick={this.navToNextPage} />
              </i-hstack>

            </i-vstack>

          </i-panel>

          <i-panel id='bannerPage' width='100%' visible={false} minHeight={300} />

        </i-panel>
      </i-panel>
    );
  }
}
