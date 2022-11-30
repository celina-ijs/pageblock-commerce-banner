(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // src/commerce-banner.tsx
  var import_components2 = __toModule(__require("@ijstech/components"));

  // src/commerce-banner.css.ts
  var import_components = __toModule(__require("@ijstech/components"));
  var Theme = import_components.Styles.Theme.ThemeVars;
  import_components.Styles.cssRule("#bannerPage", {
    $nest: {
      ".changePageBtn:hover": {
        backgroundColor: "black"
      }
    }
  });

  // src/commerce-banner.tsx
  var alignItems = [
    {
      caption: "Left",
      value: "left",
      checked: true
    },
    {
      caption: "Center",
      value: "center",
      checked: false
    },
    {
      caption: "Right",
      value: "right",
      checked: false
    }
  ];
  var autoItems = [
    {
      caption: "Fullwidth",
      value: "fullwidth",
      checked: false
    },
    {
      caption: "Auto Width",
      value: "auto-width",
      checked: false
    },
    {
      caption: "Auto Height",
      value: "auto-height",
      checked: false
    }
  ];
  var CommerceBannerBlock = class extends import_components2.Module {
    constructor() {
      super(...arguments);
      this.data = [{}];
      this.confirmData = [];
      this.backgroundUploaderList = [{}];
      this.goodsImgUploaderList = [{}];
      this.bannerPageList = [{}];
      this.currentPage = 0;
      this.tag = {};
      this.defaultEdit = true;
    }
    async init() {
      super.init();
      this.preConfig();
      this.currentPage = 0;
    }
    async getData() {
      return this.data;
    }
    async setData(value) {
      this.data = this.shallowCopyList(value);
      this.renderBanner();
    }
    getTag() {
      return this.tag;
    }
    async setTag(value) {
      this.tag = value;
      this.widthElm.value = value.width;
      this.heightElm.value = value.height;
      this.alignElm.selectedValue = value.align;
      this.autoElm.selectedValue = value.auto;
    }
    async edit() {
      this.bannerPageList = this.shallowCopyList(this.data);
      this.renderConfigPnl();
      this.configPage.visible = true;
      this.bannerPage.visible = false;
    }
    shallowCopyList(targetList) {
      let newList = [];
      for (let i = 0; i < targetList.length; i++) {
        newList.push({
          background: targetList[i].background,
          goodsImg: targetList[i].goodsImg,
          title: targetList[i].title,
          content: targetList[i].content,
          price: targetList[i].price
        });
        newList[i].background = targetList[i].hasOwnProperty("background") ? targetList[i].background : "";
        newList[i].goodsImg = targetList[i].hasOwnProperty("goodsImg") ? targetList[i].goodsImg : "";
        newList[i].title = targetList[i].hasOwnProperty("title") ? targetList[i].title : "";
        newList[i].content = targetList[i].hasOwnProperty("content") ? targetList[i].content : "";
        newList[i].price = targetList[i].hasOwnProperty("price") ? targetList[i].price : 0;
      }
      return newList;
    }
    async confirm() {
      console.log("confirm");
      this.confirmData = this.shallowCopyList(this.bannerPageList);
      await this.setData(this.confirmData);
      this.consoleLog();
      this.consoleLog();
      this.renderBanner();
      this.configPage.visible = false;
      this.bannerPage.visible = true;
    }
    async discard() {
      console.log("discard");
      this.bannerPageList = this.shallowCopyList(this.confirmData);
      if (this.currentPage >= this.confirmData.length - 1) {
        this.currentPage = this.confirmData.length - 1;
      }
      this.consoleLog();
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
    validate() {
      console.log("validate");
      return true;
    }
    onChangeAlign(source, event) {
      console.log("align: ", source.selectedValue);
    }
    onChangeAuto(source, event) {
      console.log("auto: ", source.selectedValue);
    }
    async consoleLog() {
      console.log("bannerList: ", this.bannerPageList);
      console.log("confirmedData: ", this.confirmData);
      console.log("this.data: ", await this.getData());
    }
    async handleBackgroundUploaderOnChange(control, files) {
      if (files && files[0]) {
        const toBase64 = (file) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
        this.tempBackgroud = await toBase64(files[0]);
        this.setBackgroundImg();
      }
    }
    setBackgroundImg() {
      this.bannerPageList[this.currentPage].background = this.tempBackgroud;
    }
    async handleImgUploaderOnChange(control, files) {
      if (files && files[0]) {
        const toBase64 = (file) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
        this.tempGoodsImg = await toBase64(files[0]);
        this.setGoodsImg();
      }
    }
    setGoodsImg() {
      this.bannerPageList[this.currentPage].goodsImg = this.tempGoodsImg;
    }
    preConfig() {
      this.currentPageLabel.caption = `Current page is 1 / 1`;
      this.backgroundUploaderList[0] = /* @__PURE__ */ this.$render("i-upload", {
        width: "300px",
        height: "300px",
        caption: "Upload background image here",
        border: { width: 1, style: "dashed" },
        onChanged: this.handleBackgroundUploaderOnChange
      });
      this.goodsImgUploaderList[0] = /* @__PURE__ */ this.$render("i-upload", {
        width: "300px",
        height: "300px",
        caption: "Upload goods image here",
        border: { width: 1, style: "dashed" },
        onChanged: this.handleImgUploaderOnChange
      });
    }
    renderBanner() {
      this.bannerPage.innerHTML = "";
      if (this.data[this.currentPage].background && this.data[this.currentPage].background != "") {
        this.bannerPage.style.backgroundImage = "linear-gradient(to bottom, rgb(0 0 0 / 6%), rgb(0 0 0 / 80%)),url(" + this.data[this.currentPage].background + ")";
      } else {
        this.bannerPage.style.background = "none";
      }
      this.bannerPage.style.backgroundSize = "100% auto";
      this.bannerPage.append(/* @__PURE__ */ this.$render("i-hstack", {
        width: "100%",
        verticalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-hstack", {
        id: "leftBtn",
        class: "changePageBtn pointer",
        width: "3%",
        height: "50px",
        verticalAlignment: "center",
        horizontalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-icon", {
        name: "angle-left",
        width: "20px",
        height: "20px",
        fill: "white"
      })), /* @__PURE__ */ this.$render("i-vstack", {
        width: "94%"
      }, /* @__PURE__ */ this.$render("i-hstack", {
        width: "100%",
        horizontalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-vstack", {
        width: "50%",
        gap: 10,
        padding: { left: "3rem", top: "4rem", right: "2rem", bottom: "2rem" },
        minHeight: 300
      }, /* @__PURE__ */ this.$render("i-vstack", {
        width: "100%",
        gap: 10
      }, /* @__PURE__ */ this.$render("i-label", {
        caption: this.data[this.currentPage].title ? this.data[this.currentPage].title + "" : "",
        font: { bold: true, size: "40px", color: "white" },
        overflowWrap: "break-word"
      }), /* @__PURE__ */ this.$render("i-label", {
        caption: this.data[this.currentPage].content ? this.data[this.currentPage].content + "" : "",
        font: { color: "white" }
      })), /* @__PURE__ */ this.$render("i-hstack", {
        width: "100%",
        gap: 10,
        verticalAlignment: "center",
        margin: { top: "3rem" }
      }, /* @__PURE__ */ this.$render("i-button", {
        caption: "Add to cart",
        icon: { name: "shopping-cart" },
        font: { color: "black" },
        background: { color: "white" },
        padding: { top: 13, right: 24, bottom: 12, left: 24 },
        visible: this.data[this.currentPage].price ? true : false
      }), /* @__PURE__ */ this.$render("i-label", {
        caption: this.data[this.currentPage].price && this.data[this.currentPage].price != -1 ? "Starting at $" + this.data[this.currentPage].price : "",
        font: { color: "white" }
      }))), /* @__PURE__ */ this.$render("i-vstack", {
        width: "50%",
        padding: { left: "3rem", top: "4rem", right: "2rem", bottom: "2rem" }
      }, /* @__PURE__ */ this.$render("i-image", {
        url: this.data[this.currentPage].goodsImg ? this.data[this.currentPage].goodsImg : null
      }))), /* @__PURE__ */ this.$render("i-hstack", {
        id: "dotPanel",
        width: "100%",
        horizontalAlignment: "center",
        margin: { bottom: "1.5rem" }
      })), /* @__PURE__ */ this.$render("i-hstack", {
        id: "rightBtn",
        class: "changePageBtn pointer",
        width: "3%",
        height: "50px",
        verticalAlignment: "center",
        horizontalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-icon", {
        name: "angle-right",
        width: "20px",
        height: "20px",
        fill: "white"
      }))));
      for (let i = 0; i < this.data.length; i++) {
        if (i != this.currentPage) {
          this.dotPanel.append(/* @__PURE__ */ this.$render("i-icon", {
            class: "pointer",
            name: "dot-circle",
            margin: { left: 2, right: 2 },
            width: "20px",
            height: "20px",
            fill: "black",
            onClick: () => {
              this.currentPage = i;
              this.renderBanner();
            }
          }));
        } else {
          this.dotPanel.append(/* @__PURE__ */ this.$render("i-icon", {
            name: "dot-circle",
            margin: { left: 2, right: 2 },
            width: "20px",
            height: "20px",
            fill: "grey"
          }));
        }
      }
      this.leftBtn.onClick = () => {
        if (this.currentPage != 0) {
          this.currentPage--;
          this.renderBanner();
        } else {
          this.currentPage = this.bannerPageList.length - 1;
          this.renderBanner();
        }
      };
      this.rightBtn.onClick = () => {
        if (this.currentPage != this.bannerPageList.length - 1) {
          this.currentPage++;
          this.renderBanner();
        } else {
          this.currentPage = 0;
          this.renderBanner();
        }
      };
    }
    navToPrevPage() {
      this.currentPage = this.currentPage != 0 ? this.currentPage - 1 : 0;
      this.renderConfigPnl();
    }
    navToNextPage() {
      this.currentPage = this.currentPage < this.bannerPageList.length - 1 ? this.currentPage + 1 : this.currentPage;
      this.renderConfigPnl();
    }
    addPage() {
      this.currentPageLabel.caption = `Current page is ${this.currentPage + 1} / ${this.bannerPageList.length + 1}`;
      this.bannerPageList.push({});
      if (this.backgroundUploaderList.length <= this.currentPage) {
        this.backgroundUploaderList.push(/* @__PURE__ */ this.$render("i-upload", {
          width: "300px",
          height: "300px",
          caption: "Upload background image here",
          border: { width: 1, style: "dashed" },
          onChanged: this.handleBackgroundUploaderOnChange
        }));
      }
      if (this.goodsImgUploaderList.length <= this.currentPage) {
        this.goodsImgUploaderList.push(/* @__PURE__ */ this.$render("i-upload", {
          width: "300px",
          height: "300px",
          caption: "Upload goods image here",
          border: { width: 1, style: "dashed" },
          onChanged: this.handleImgUploaderOnChange
        }));
      }
      this.renderConfigPnl();
    }
    removePage() {
      let deletePage = this.currentPage;
      if (this.bannerPageList.length != 1) {
        if (deletePage == this.bannerPageList.length - 1) {
          this.currentPage--;
        }
        let tempItem = this.bannerPageList[deletePage];
        this.bannerPageList = this.bannerPageList.filter((item) => item != tempItem);
        tempItem = this.backgroundUploaderList[deletePage];
        this.backgroundUploaderList = this.backgroundUploaderList.filter((item) => item != tempItem);
        tempItem = this.goodsImgUploaderList[deletePage];
        this.goodsImgUploaderList = this.goodsImgUploaderList.filter((item) => item != tempItem);
      }
      this.renderConfigPnl();
    }
    renderConfigPnl() {
      this.configLeftBtn.opacity = this.currentPage == 0 ? 0.5 : 1;
      this.configRightBtn.opacity = this.currentPage == this.bannerPageList.length - 1 ? 0.5 : 1;
      this.configDeleteBtn.opacity = this.bannerPageList.length == 1 ? 0.5 : 1;
      this.currentPageLabel.caption = `Current page is ${this.currentPage + 1} / ${this.bannerPageList.length}`;
      this.titleInput.value = this.bannerPageList[this.currentPage].title;
      this.contentInput.value = this.bannerPageList[this.currentPage].content;
      this.priceInput.value = this.bannerPageList[this.currentPage].price;
      if (this.backgroundUploaderList.length <= this.currentPage) {
        this.backgroundUploaderList.push(/* @__PURE__ */ this.$render("i-upload", {
          width: "300px",
          height: "300px",
          caption: "Upload background image here",
          border: { width: 1, style: "dashed" },
          onChanged: this.handleBackgroundUploaderOnChange
        }));
      }
      this.backgroundUploaderWrapper.innerHTML = "";
      this.backgroundUploaderWrapper.append(this.backgroundUploaderList[this.currentPage]);
      if (this.goodsImgUploaderList.length <= this.currentPage) {
        this.goodsImgUploaderList.push(/* @__PURE__ */ this.$render("i-upload", {
          width: "300px",
          height: "300px",
          caption: "Upload goods image here",
          border: { width: 1, style: "dashed" },
          onChanged: this.handleImgUploaderOnChange
        }));
      }
      this.goodsImgUploaderWrapper.innerHTML = "";
      this.goodsImgUploaderWrapper.append(this.goodsImgUploaderList[this.currentPage]);
    }
    setTitle() {
      this.bannerPageList[this.currentPage].title = this.titleInput.value;
    }
    setContent() {
      this.bannerPageList[this.currentPage].content = this.contentInput.value;
    }
    setPrice() {
      this.bannerPageList[this.currentPage].price = this.priceInput.value;
      console.log("setPrice");
      console.log(this.bannerPageList);
      console.log(this.confirmData);
    }
    render() {
      return /* @__PURE__ */ this.$render("i-panel", null, /* @__PURE__ */ this.$render("i-modal", {
        id: "mdConfig",
        showBackdrop: true,
        background: { color: "#FFF" },
        maxWidth: "500px",
        popupPlacement: "center",
        closeIcon: { name: "times", fill: "#aaa" }
      }, /* @__PURE__ */ this.$render("i-hstack", {
        justifyContent: "start",
        alignItems: "start"
      }, /* @__PURE__ */ this.$render("i-panel", {
        width: "30%",
        padding: { top: 5, bottom: 5, left: 5, right: 5 }
      }, /* @__PURE__ */ this.$render("i-input", {
        id: "widthElm",
        caption: "Width",
        width: "100%",
        captionWidth: "46px"
      })), /* @__PURE__ */ this.$render("i-panel", {
        width: "30%",
        padding: { top: 5, bottom: 5, left: 5, right: 5 }
      }, /* @__PURE__ */ this.$render("i-input", {
        id: "heightElm",
        caption: "Height",
        width: "100%",
        captionWidth: "50px"
      })), /* @__PURE__ */ this.$render("i-panel", {
        width: "40%",
        padding: { top: 5, bottom: 5, left: 5, right: 5 }
      }, /* @__PURE__ */ this.$render("i-label", {
        width: 100,
        caption: "Align",
        margin: { bottom: 8 }
      }), /* @__PURE__ */ this.$render("i-radio-group", {
        id: "alignElm",
        width: "100%",
        selectedValue: "left",
        radioItems: alignItems,
        onChanged: this.onChangeAlign,
        display: "block"
      }))), /* @__PURE__ */ this.$render("i-hstack", {
        justifyContent: "start",
        alignItems: "center"
      }, /* @__PURE__ */ this.$render("i-panel", {
        width: "100%",
        padding: { top: 5, bottom: 5, left: 5, right: 5 }
      }, /* @__PURE__ */ this.$render("i-label", {
        width: 100,
        caption: "Auto",
        margin: { bottom: 8 }
      }), /* @__PURE__ */ this.$render("i-radio-group", {
        id: "autoElm",
        width: "100%",
        selectedValue: "left",
        radioItems: autoItems,
        onChanged: this.onChangeAuto,
        display: "block"
      }))), /* @__PURE__ */ this.$render("i-hstack", {
        justifyContent: "end",
        alignItems: "center",
        padding: { top: 5, bottom: 5 }
      }, /* @__PURE__ */ this.$render("i-button", {
        caption: "Cancel",
        padding: { top: 5, bottom: 5, left: 10, right: 10 },
        font: { color: "white" },
        background: { color: "#B2554D" },
        icon: { name: "times", fill: "#FFF" },
        onClick: this.onConfigCancel
      }), /* @__PURE__ */ this.$render("i-button", {
        caption: "Save",
        padding: { top: 5, bottom: 5, left: 10, right: 10 },
        icon: { name: "save", fill: "#FFF" },
        onClick: this.onConfigSave,
        margin: { left: 5 },
        font: { color: "white" },
        background: { color: "#77B24D" }
      }))), /* @__PURE__ */ this.$render("i-panel", {
        width: "100%"
      }, /* @__PURE__ */ this.$render("i-panel", {
        id: "configPage",
        width: "100%"
      }, /* @__PURE__ */ this.$render("i-hstack", {
        width: "100%",
        horizontalAlignment: "center",
        padding: { left: "1rem", top: "1rem", right: "1rem", bottom: "1rem" }
      }, /* @__PURE__ */ this.$render("i-vstack", {
        gap: 5,
        margin: { top: 20, bottom: 20 },
        width: "40%"
      }, /* @__PURE__ */ this.$render("i-input", {
        id: "titleInput",
        inputType: "textarea",
        placeholder: "Input the title here",
        width: "100%",
        height: 100,
        onChanged: this.setTitle
      }), /* @__PURE__ */ this.$render("i-input", {
        id: "contentInput",
        inputType: "textarea",
        placeholder: "Input the content here",
        width: "100%",
        height: 300,
        onChanged: this.setContent
      }), /* @__PURE__ */ this.$render("i-input", {
        id: "priceInput",
        inputType: "textarea",
        placeholder: "Input the price here",
        width: "100%",
        onChanged: this.setPrice
      })), /* @__PURE__ */ this.$render("i-hstack", {
        gap: 5,
        verticalAlignment: "center",
        padding: { left: "1rem" }
      }, /* @__PURE__ */ this.$render("i-panel", {
        id: "backgroundUploaderWrapper"
      }), /* @__PURE__ */ this.$render("i-panel", {
        id: "goodsImgUploaderWrapper"
      }))), /* @__PURE__ */ this.$render("i-hstack", {
        width: "100%",
        horizontalAlignment: "center",
        verticalAlignment: "end",
        margin: { top: "1rem", bottom: "1rem" }
      }, /* @__PURE__ */ this.$render("i-label", {
        id: "currentPageLabel"
      })), /* @__PURE__ */ this.$render("i-hstack", {
        width: "100%",
        horizontalAlignment: "center",
        verticalAlignment: "end",
        gap: 7,
        margin: { bottom: "1rem" }
      }, /* @__PURE__ */ this.$render("i-button", {
        id: "configLeftBtn",
        icon: { name: "arrow-left" },
        width: 100,
        height: 50,
        onClick: this.navToPrevPage
      }), /* @__PURE__ */ this.$render("i-button", {
        id: "configAddBtn",
        icon: { name: "plus" },
        width: 100,
        height: 50,
        onClick: this.addPage
      }), /* @__PURE__ */ this.$render("i-button", {
        id: "configDeleteBtn",
        icon: { name: "times-circle" },
        width: 100,
        height: 50,
        onClick: this.removePage
      }), /* @__PURE__ */ this.$render("i-button", {
        id: "configRightBtn",
        icon: { name: "arrow-right" },
        width: 100,
        height: 50,
        onClick: this.navToNextPage
      }))), /* @__PURE__ */ this.$render("i-panel", {
        id: "bannerPage",
        width: "100%",
        visible: false,
        minHeight: 300
      })));
    }
  };
  CommerceBannerBlock = __decorateClass([
    import_components2.customModule,
    (0, import_components2.customElements)("i-section-commerce-banner")
  ], CommerceBannerBlock);
})();
