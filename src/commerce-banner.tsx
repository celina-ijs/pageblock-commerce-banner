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
  Button,
  HStack
} from "@ijstech/components";
import { PageBlock } from "./pageBlock.interface";
import './commerce-banner.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["i-section-commerce-banner"]: ImageBlock;
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

@customModule
@customElements("i-section-image")
export class ImageBlock extends Module implements PageBlock {
  private data: any;
  private mdConfig: Modal;
  private widthElm: Input;
  private heightElm: Input;
  private alignElm: RadioGroup;
  private autoElm: RadioGroup;

  tag: any = {};
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  async init() {
    super.init();
  }

  async getData() {
    return this.data;
  }

  async setData(value: any) {
    console.log("set data");
    
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
    
  }

  async confirm() {
    console.log("confirm");
  }

  async discard() {
    console.log("discard");
  }

  async config() {
    this.mdConfig.visible = true;
  }

  async onConfigCancel() {
    this.mdConfig.visible = false;
  }

  async onConfigSave() {
    console.log("onConfigSave");
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
            <i-panel
              width={"30%"}
              padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <i-input
                id={"widthElm"}
                caption={"Width"}
                width={"100%"}
                captionWidth={"46px"}
              ></i-input>
            </i-panel>
            <i-panel
              width={"30%"}
              padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <i-input
                id={"heightElm"}
                caption={"Height"}
                width={"100%"}
                captionWidth={"50px"}
              ></i-input>
            </i-panel>
            <i-panel
              width={"40%"}
              padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <i-label
                width={100}
                caption="Align"
                margin={{ bottom: 8 }}
              ></i-label>
              <i-radio-group
                id="alignElm"
                width={"100%"}
                selectedValue="left"
                radioItems={alignItems}
                onChanged={this.onChangeAlign}
                display="block"
              ></i-radio-group>
            </i-panel>
          </i-hstack>

          <i-hstack justifyContent={"start"} alignItems={"center"}>
            <i-panel
              width={"100%"}
              padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <i-label
                width={100}
                caption="Auto"
                margin={{ bottom: 8 }}
              ></i-label>
              <i-radio-group
                id="autoElm"
                width={"100%"}
                selectedValue="left"
                radioItems={autoItems}
                onChanged={this.onChangeAuto}
                display="block"
              ></i-radio-group>
            </i-panel>
          </i-hstack>

          <i-hstack
            justifyContent={"end"}
            alignItems={"center"}
            padding={{ top: 5, bottom: 5 }}
          >
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
        
        <i-panel id={"pnlBanner"}>

        </i-panel>
      </i-panel>
    );
  }
}
