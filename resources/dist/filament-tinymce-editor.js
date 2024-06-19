// resources/js/tinymce.js
function tinyeditor({
  state,
  statePath,
  selector,
  plugins,
  toolbar,
  language = "en",
  language_url = null,
  directionality = "ltr",
  max_height = 0,
  min_height = 500,
  skin = "oxide",
  content_css = "default",
  toolbar_sticky = false,
  templates = "",
  menubar = false,
  font_size_formats = "",
  fontfamily = "",
  relative_urls = true,
  image_list = null,
  image_advtab = false,
  image_description = false,
  image_class_list = null,
  remove_script_host = true,
  convert_urls = true,
  custom_configs = {},
  setup = null,
  disabled = false,
  locale = "en",
  license_key = "gpl",
  placeholder = null
}) {
  let editors = window.filamentTinyEditors || {};
  return {
    id: null,
    state,
    statePath,
    selector,
    language,
    language_url,
    directionality,
    max_height,
    min_height,
    skin,
    content_css,
    plugins,
    toolbar,
    toolbar_sticky,
    templates,
    menubar,
    relative_urls,
    remove_script_host,
    convert_urls,
    font_size_formats,
    fontfamily,
    setup,
    image_list,
    image_advtab,
    image_description,
    image_class_list,
    license_key,
    custom_configs,
    updatedAt: Date.now(),
    disabled,
    locale,
    init() {
      this.initEditor(state.initialValue);
      window.filamentTinyEditors = editors;
      this.$watch("state", (newState, oldState) => {
        if (newState === "<p></p>" && newState !== this.editor().getContent()) {
          editors[this.statePath].destroy();
          this.initEditor(newState);
        }
        if (this.editor().container && newState !== this.editor().getContent()) {
          this.editor().resetContent(newState || "");
          this.putCursorToEnd();
        }
      });
    },
    editor() {
      return tinymce.get(editors[this.statePath]);
    },
    initEditor(content) {
      let _this = this;
      let $wire = this.$wire;
      tinymce.init({
        selector,
        language,
        language_url,
        directionality,
        statusbar: false,
        promotion: false,
        max_height,
        min_height,
        skin,
        content_css,
        plugins,
        toolbar,
        toolbar_sticky,
        toolbar_sticky_offset: 64,
        toolbar_mode: "sliding",
        templates,
        menubar,
        menu: {
          file: { title: "File", items: "newdocument restoredraft | preview | export print | deleteallconversations" },
          edit: { title: "Edit", items: "undo redo | cut copy paste pastetext | selectall | searchreplace" },
          view: { title: "View", items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments" },
          insert: { title: "Insert", items: "image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime" },
          format: { title: "Format", items: "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat" },
          tools: { title: "Tools", items: "spellchecker spellcheckerlanguage | a11ycheck code wordcount" },
          table: { title: "Table", items: "inserttable | cell row column | advtablesort | tableprops deletetable" },
          help: { title: "Help", items: "help" }
        },
        font_size_formats,
        fontfamily,
        font_family_formats: fontfamily,
        relative_urls,
        remove_script_host,
        convert_urls,
        image_list,
        image_advtab,
        image_description,
        image_class_list,
        license_key,
        ...custom_configs,
        setup: function(editor) {
          if (!window.tinySettingsCopy) {
            window.tinySettingsCopy = [];
          }
          if (editor.settings && !window.tinySettingsCopy.some((obj) => obj.id === editor.settings.id)) {
            window.tinySettingsCopy.push(editor.settings);
          }
          editor.on("blur", function(e) {
            _this.updatedAt = Date.now();
            _this.state = editor.getContent();
          });
          editor.on("init", function(e) {
            editors[_this.statePath] = editor.id;
            if (content != null) {
              editor.setContent(content);
            }
          });
          if (typeof setup === "function") {
            setup(editor);
          }
        },
        images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
          if (!blobInfo.blob())
            return;
          const finishCallback = () => {
            $wire.getFormComponentFileAttachmentUrl(statePath).then((url) => {
              if (!url) {
                reject("error");
                return;
              }
              resolve(url);
            });
          };
          const errorCallback = () => {
          };
          const progressCallback = (e) => {
            progress(e.detail.progress);
          };
          $wire.upload(`componentFileAttachments.${statePath}`, blobInfo.blob(), finishCallback, errorCallback, progressCallback);
        }),
        automatic_uploads: true
      });
    },
    updateEditorContent(content) {
      this.editor().setContent(content);
    },
    putCursorToEnd() {
      this.editor().selection.select(this.editor().getBody(), true);
      this.editor().selection.collapse(false);
    }
  };
}
export {
  tinyeditor as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vanMvdGlueW1jZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGlueWVkaXRvcih7XG5cdHN0YXRlLFxuXHRzdGF0ZVBhdGgsXG5cdHNlbGVjdG9yLFxuXHRwbHVnaW5zLFxuXHR0b29sYmFyLFxuXHRsYW5ndWFnZSA9IFwiZW5cIixcblx0bGFuZ3VhZ2VfdXJsID0gbnVsbCxcblx0ZGlyZWN0aW9uYWxpdHkgPSBcImx0clwiLFxuXHRtYXhfaGVpZ2h0ID0gMCxcblx0bWluX2hlaWdodCA9IDUwMCxcblx0c2tpbiA9IFwib3hpZGVcIixcblx0Y29udGVudF9jc3MgPSBcImRlZmF1bHRcIixcblx0dG9vbGJhcl9zdGlja3kgPSBmYWxzZSxcblx0dGVtcGxhdGVzID0gXCJcIixcblx0bWVudWJhciA9IGZhbHNlLFxuXHRmb250X3NpemVfZm9ybWF0cyA9ICcnLFxuXHRmb250ZmFtaWx5ID0gJycsXG5cdHJlbGF0aXZlX3VybHMgPSB0cnVlLFxuXHRpbWFnZV9saXN0ID0gbnVsbCxcblx0aW1hZ2VfYWR2dGFiID0gZmFsc2UsXG5cdGltYWdlX2Rlc2NyaXB0aW9uID0gZmFsc2UsXG5cdGltYWdlX2NsYXNzX2xpc3QgPSBudWxsLFxuXHRyZW1vdmVfc2NyaXB0X2hvc3QgPSB0cnVlLFxuXHRjb252ZXJ0X3VybHMgPSB0cnVlLFxuXHRjdXN0b21fY29uZmlncyA9IHt9LFxuXHRzZXR1cCA9IG51bGwsXG5cdGRpc2FibGVkID0gZmFsc2UsXG5cdGxvY2FsZSA9IFwiZW5cIixcblx0bGljZW5zZV9rZXkgPSBcImdwbFwiLFxuXHRwbGFjZWhvbGRlciA9IG51bGwsXG59KSB7XG5cdGxldCBlZGl0b3JzID0gd2luZG93LmZpbGFtZW50VGlueUVkaXRvcnMgfHwge307XG5cdHJldHVybiB7XG5cdFx0aWQ6IG51bGwsXG5cdFx0c3RhdGU6IHN0YXRlLFxuXHRcdHN0YXRlUGF0aDogc3RhdGVQYXRoLFxuXHRcdHNlbGVjdG9yOiBzZWxlY3Rvcixcblx0XHRsYW5ndWFnZTogbGFuZ3VhZ2UsXG5cdFx0bGFuZ3VhZ2VfdXJsOiBsYW5ndWFnZV91cmwsXG5cdFx0ZGlyZWN0aW9uYWxpdHk6IGRpcmVjdGlvbmFsaXR5LFxuXHRcdG1heF9oZWlnaHQ6IG1heF9oZWlnaHQsXG5cdFx0bWluX2hlaWdodDogbWluX2hlaWdodCxcblx0XHRza2luOiBza2luLFxuXHRcdGNvbnRlbnRfY3NzOiBjb250ZW50X2Nzcyxcblx0XHRwbHVnaW5zOiBwbHVnaW5zLFxuXHRcdHRvb2xiYXI6IHRvb2xiYXIsXG5cdFx0dG9vbGJhcl9zdGlja3k6IHRvb2xiYXJfc3RpY2t5LFxuXHRcdHRlbXBsYXRlczogdGVtcGxhdGVzLFxuXHRcdG1lbnViYXI6IG1lbnViYXIsXG5cdFx0cmVsYXRpdmVfdXJsczogcmVsYXRpdmVfdXJscyxcblx0XHRyZW1vdmVfc2NyaXB0X2hvc3Q6IHJlbW92ZV9zY3JpcHRfaG9zdCxcblx0XHRjb252ZXJ0X3VybHM6IGNvbnZlcnRfdXJscyxcblx0XHRmb250X3NpemVfZm9ybWF0czogZm9udF9zaXplX2Zvcm1hdHMsXG5cdFx0Zm9udGZhbWlseTogZm9udGZhbWlseSxcblx0XHRzZXR1cDogc2V0dXAsXG5cdFx0aW1hZ2VfbGlzdDogaW1hZ2VfbGlzdCxcblx0XHRpbWFnZV9hZHZ0YWI6IGltYWdlX2FkdnRhYixcblx0XHRpbWFnZV9kZXNjcmlwdGlvbjogaW1hZ2VfZGVzY3JpcHRpb24sXG5cdFx0aW1hZ2VfY2xhc3NfbGlzdDogaW1hZ2VfY2xhc3NfbGlzdCxcblx0XHRsaWNlbnNlX2tleTogbGljZW5zZV9rZXksXG5cdFx0Y3VzdG9tX2NvbmZpZ3M6IGN1c3RvbV9jb25maWdzLFxuXHRcdHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcblx0XHRkaXNhYmxlZCxcblx0XHRsb2NhbGU6IGxvY2FsZSxcblx0XHRpbml0KCkge1xuXHRcdFx0dGhpcy5pbml0RWRpdG9yKHN0YXRlLmluaXRpYWxWYWx1ZSk7XG5cblx0XHRcdHdpbmRvdy5maWxhbWVudFRpbnlFZGl0b3JzID0gZWRpdG9ycztcblxuXHRcdFx0dGhpcy4kd2F0Y2goXCJzdGF0ZVwiLCAobmV3U3RhdGUsIG9sZFN0YXRlKSA9PiB7XG5cdFx0XHRcdGlmIChuZXdTdGF0ZSA9PT0gXCI8cD48L3A+XCIgJiYgbmV3U3RhdGUgIT09IHRoaXMuZWRpdG9yKCkuZ2V0Q29udGVudCgpKSB7XG5cdFx0XHRcdFx0ZWRpdG9yc1t0aGlzLnN0YXRlUGF0aF0uZGVzdHJveSgpO1xuXHRcdFx0XHRcdHRoaXMuaW5pdEVkaXRvcihuZXdTdGF0ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5lZGl0b3IoKS5jb250YWluZXIgJiYgbmV3U3RhdGUgIT09IHRoaXMuZWRpdG9yKCkuZ2V0Q29udGVudCgpKSB7XG5cdFx0XHRcdFx0dGhpcy5lZGl0b3IoKS5yZXNldENvbnRlbnQobmV3U3RhdGUgfHwgXCJcIik7XG5cdFx0XHRcdFx0dGhpcy5wdXRDdXJzb3JUb0VuZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGVkaXRvcigpIHtcblx0XHRcdHJldHVybiB0aW55bWNlLmdldChlZGl0b3JzW3RoaXMuc3RhdGVQYXRoXSk7XG5cdFx0fSxcblx0XHRpbml0RWRpdG9yKGNvbnRlbnQpIHtcblx0XHRcdGxldCBfdGhpcyA9IHRoaXM7XG5cdFx0XHRsZXQgJHdpcmUgPSB0aGlzLiR3aXJlO1xuXG5cdFx0XHR0aW55bWNlLmluaXQoe1xuXHRcdFx0XHRzZWxlY3Rvcjogc2VsZWN0b3IsXG5cdFx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRcdFx0bGFuZ3VhZ2VfdXJsOiBsYW5ndWFnZV91cmwsXG5cdFx0XHRcdGRpcmVjdGlvbmFsaXR5OiBkaXJlY3Rpb25hbGl0eSxcblx0XHRcdFx0c3RhdHVzYmFyOiBmYWxzZSxcblx0XHRcdFx0cHJvbW90aW9uOiBmYWxzZSxcblx0XHRcdFx0bWF4X2hlaWdodDogbWF4X2hlaWdodCxcblx0XHRcdFx0bWluX2hlaWdodDogbWluX2hlaWdodCxcblx0XHRcdFx0c2tpbjogc2tpbixcblx0XHRcdFx0Y29udGVudF9jc3M6IGNvbnRlbnRfY3NzLFxuXHRcdFx0XHRwbHVnaW5zOiBwbHVnaW5zLFxuXHRcdFx0XHR0b29sYmFyOiB0b29sYmFyLFxuXHRcdFx0XHR0b29sYmFyX3N0aWNreTogdG9vbGJhcl9zdGlja3ksXG5cdFx0XHRcdHRvb2xiYXJfc3RpY2t5X29mZnNldDogNjQsXG5cdFx0XHRcdHRvb2xiYXJfbW9kZTogXCJzbGlkaW5nXCIsXG5cdFx0XHRcdHRlbXBsYXRlczogdGVtcGxhdGVzLFxuXHRcdFx0XHRtZW51YmFyOiBtZW51YmFyLFxuXHRcdFx0XHRtZW51OiB7XG5cdFx0XHRcdFx0ZmlsZTogeyB0aXRsZTogXCJGaWxlXCIsIGl0ZW1zOiBcIm5ld2RvY3VtZW50IHJlc3RvcmVkcmFmdCB8IHByZXZpZXcgfCBleHBvcnQgcHJpbnQgfCBkZWxldGVhbGxjb252ZXJzYXRpb25zXCIgfSxcblx0XHRcdFx0XHRlZGl0OiB7IHRpdGxlOiBcIkVkaXRcIiwgaXRlbXM6IFwidW5kbyByZWRvIHwgY3V0IGNvcHkgcGFzdGUgcGFzdGV0ZXh0IHwgc2VsZWN0YWxsIHwgc2VhcmNocmVwbGFjZVwiIH0sXG5cdFx0XHRcdFx0dmlldzogeyB0aXRsZTogXCJWaWV3XCIsIGl0ZW1zOiBcImNvZGUgfCB2aXN1YWxhaWQgdmlzdWFsY2hhcnMgdmlzdWFsYmxvY2tzIHwgc3BlbGxjaGVja2VyIHwgcHJldmlldyBmdWxsc2NyZWVuIHwgc2hvd2NvbW1lbnRzXCIgfSxcblx0XHRcdFx0XHRpbnNlcnQ6IHsgdGl0bGU6IFwiSW5zZXJ0XCIsIGl0ZW1zOiBcImltYWdlIGxpbmsgbWVkaWEgYWRkY29tbWVudCBwYWdlZW1iZWQgdGVtcGxhdGUgY29kZXNhbXBsZSBpbnNlcnR0YWJsZSB8IGNoYXJtYXAgZW1vdGljb25zIGhyIHwgcGFnZWJyZWFrIG5vbmJyZWFraW5nIGFuY2hvciB0YWJsZW9mY29udGVudHMgfCBpbnNlcnRkYXRldGltZVwiIH0sXG5cdFx0XHRcdFx0Zm9ybWF0OiB7IHRpdGxlOiBcIkZvcm1hdFwiLCBpdGVtczogXCJib2xkIGl0YWxpYyB1bmRlcmxpbmUgc3RyaWtldGhyb3VnaCBzdXBlcnNjcmlwdCBzdWJzY3JpcHQgY29kZWZvcm1hdCB8IHN0eWxlcyBibG9ja3MgZm9udGZhbWlseSBmb250c2l6ZSBhbGlnbiBsaW5laGVpZ2h0IHwgZm9yZWNvbG9yIGJhY2tjb2xvciB8IGxhbmd1YWdlIHwgcmVtb3ZlZm9ybWF0XCIgfSxcblx0XHRcdFx0XHR0b29sczogeyB0aXRsZTogXCJUb29sc1wiLCBpdGVtczogXCJzcGVsbGNoZWNrZXIgc3BlbGxjaGVja2VybGFuZ3VhZ2UgfCBhMTF5Y2hlY2sgY29kZSB3b3JkY291bnRcIiB9LFxuXHRcdFx0XHRcdHRhYmxlOiB7IHRpdGxlOiBcIlRhYmxlXCIsIGl0ZW1zOiBcImluc2VydHRhYmxlIHwgY2VsbCByb3cgY29sdW1uIHwgYWR2dGFibGVzb3J0IHwgdGFibGVwcm9wcyBkZWxldGV0YWJsZVwiIH0sXG5cdFx0XHRcdFx0aGVscDogeyB0aXRsZTogXCJIZWxwXCIsIGl0ZW1zOiBcImhlbHBcIiB9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb250X3NpemVfZm9ybWF0czogZm9udF9zaXplX2Zvcm1hdHMsXG5cdFx0XHRcdGZvbnRmYW1pbHk6IGZvbnRmYW1pbHksXG5cdFx0XHRcdGZvbnRfZmFtaWx5X2Zvcm1hdHM6IGZvbnRmYW1pbHksXG5cdFx0XHRcdHJlbGF0aXZlX3VybHM6IHJlbGF0aXZlX3VybHMsXG5cdFx0XHRcdHJlbW92ZV9zY3JpcHRfaG9zdDogcmVtb3ZlX3NjcmlwdF9ob3N0LFxuXHRcdFx0XHRjb252ZXJ0X3VybHM6IGNvbnZlcnRfdXJscyxcblx0XHRcdFx0aW1hZ2VfbGlzdDogaW1hZ2VfbGlzdCxcblx0XHRcdFx0aW1hZ2VfYWR2dGFiOiBpbWFnZV9hZHZ0YWIsXG5cdFx0XHRcdGltYWdlX2Rlc2NyaXB0aW9uOiBpbWFnZV9kZXNjcmlwdGlvbixcblx0XHRcdFx0aW1hZ2VfY2xhc3NfbGlzdDogaW1hZ2VfY2xhc3NfbGlzdCxcblx0XHRcdFx0bGljZW5zZV9rZXk6IGxpY2Vuc2Vfa2V5LFxuXG5cdFx0XHRcdC4uLmN1c3RvbV9jb25maWdzLFxuXG5cdFx0XHRcdHNldHVwOiBmdW5jdGlvbiAoZWRpdG9yKSB7XG5cdFx0XHRcdFx0aWYgKCF3aW5kb3cudGlueVNldHRpbmdzQ29weSkge1xuXHRcdFx0XHRcdFx0d2luZG93LnRpbnlTZXR0aW5nc0NvcHkgPSBbXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoZWRpdG9yLnNldHRpbmdzICYmICF3aW5kb3cudGlueVNldHRpbmdzQ29weS5zb21lKChvYmopID0+IG9iai5pZCA9PT0gZWRpdG9yLnNldHRpbmdzLmlkKSkge1xuXHRcdFx0XHRcdFx0d2luZG93LnRpbnlTZXR0aW5nc0NvcHkucHVzaChlZGl0b3Iuc2V0dGluZ3MpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVkaXRvci5vbihcImJsdXJcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdF90aGlzLnVwZGF0ZWRBdCA9IERhdGUubm93KCk7XG5cdFx0XHRcdFx0XHRfdGhpcy5zdGF0ZSA9IGVkaXRvci5nZXRDb250ZW50KCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRlZGl0b3Iub24oXCJpbml0XCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRlZGl0b3JzW190aGlzLnN0YXRlUGF0aF0gPSBlZGl0b3IuaWQ7XG5cdFx0XHRcdFx0XHRpZiAoY29udGVudCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdGVkaXRvci5zZXRDb250ZW50KGNvbnRlbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBzZXR1cCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRzZXR1cChlZGl0b3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHRpbWFnZXNfdXBsb2FkX2hhbmRsZXI6IChibG9iSW5mbywgcHJvZ3Jlc3MpID0+XG5cdFx0XHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKCFibG9iSW5mby5ibG9iKCkpIHJldHVybjtcblxuXHRcdFx0XHRcdFx0Y29uc3QgZmluaXNoQ2FsbGJhY2sgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdCR3aXJlLmdldEZvcm1Db21wb25lbnRGaWxlQXR0YWNobWVudFVybChzdGF0ZVBhdGgpLnRoZW4oKHVybCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmICghdXJsKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZWplY3QoXCJlcnJvclwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSh1cmwpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdGNvbnN0IGVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7fTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgcHJvZ3Jlc3NDYWxsYmFjayA9IChlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHByb2dyZXNzKGUuZGV0YWlsLnByb2dyZXNzKTtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdCR3aXJlLnVwbG9hZChgY29tcG9uZW50RmlsZUF0dGFjaG1lbnRzLiR7c3RhdGVQYXRofWAsIGJsb2JJbmZvLmJsb2IoKSwgZmluaXNoQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIHByb2dyZXNzQ2FsbGJhY2spO1xuXHRcdFx0XHRcdH0pLFxuXG5cdFx0XHRcdGF1dG9tYXRpY191cGxvYWRzOiB0cnVlLFxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR1cGRhdGVFZGl0b3JDb250ZW50KGNvbnRlbnQpIHtcblx0XHRcdHRoaXMuZWRpdG9yKCkuc2V0Q29udGVudChjb250ZW50KTtcblx0XHR9LFxuXHRcdHB1dEN1cnNvclRvRW5kKCkge1xuXHRcdFx0dGhpcy5lZGl0b3IoKS5zZWxlY3Rpb24uc2VsZWN0KHRoaXMuZWRpdG9yKCkuZ2V0Qm9keSgpLCB0cnVlKTtcblx0XHRcdHRoaXMuZWRpdG9yKCkuc2VsZWN0aW9uLmNvbGxhcHNlKGZhbHNlKTtcblx0XHR9LFxuXHR9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFlLFNBQVIsV0FBNEI7QUFBQSxFQUNsQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYLGVBQWU7QUFBQSxFQUNmLGlCQUFpQjtBQUFBLEVBQ2pCLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLE9BQU87QUFBQSxFQUNQLGNBQWM7QUFBQSxFQUNkLGlCQUFpQjtBQUFBLEVBQ2pCLFlBQVk7QUFBQSxFQUNaLFVBQVU7QUFBQSxFQUNWLG9CQUFvQjtBQUFBLEVBQ3BCLGFBQWE7QUFBQSxFQUNiLGdCQUFnQjtBQUFBLEVBQ2hCLGFBQWE7QUFBQSxFQUNiLGVBQWU7QUFBQSxFQUNmLG9CQUFvQjtBQUFBLEVBQ3BCLG1CQUFtQjtBQUFBLEVBQ25CLHFCQUFxQjtBQUFBLEVBQ3JCLGVBQWU7QUFBQSxFQUNmLGlCQUFpQixDQUFDO0FBQUEsRUFDbEIsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsU0FBUztBQUFBLEVBQ1QsY0FBYztBQUFBLEVBQ2QsY0FBYztBQUNmLEdBQUc7QUFDRixNQUFJLFVBQVUsT0FBTyx1QkFBdUIsQ0FBQztBQUM3QyxTQUFPO0FBQUEsSUFDTixJQUFJO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxXQUFXLEtBQUssSUFBSTtBQUFBLElBQ3BCO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTztBQUNOLFdBQUssV0FBVyxNQUFNLFlBQVk7QUFFbEMsYUFBTyxzQkFBc0I7QUFFN0IsV0FBSyxPQUFPLFNBQVMsQ0FBQyxVQUFVLGFBQWE7QUFDNUMsWUFBSSxhQUFhLGFBQWEsYUFBYSxLQUFLLE9BQU8sRUFBRSxXQUFXLEdBQUc7QUFDdEUsa0JBQVEsS0FBSyxTQUFTLEVBQUUsUUFBUTtBQUNoQyxlQUFLLFdBQVcsUUFBUTtBQUFBLFFBQ3pCO0FBRUEsWUFBSSxLQUFLLE9BQU8sRUFBRSxhQUFhLGFBQWEsS0FBSyxPQUFPLEVBQUUsV0FBVyxHQUFHO0FBQ3ZFLGVBQUssT0FBTyxFQUFFLGFBQWEsWUFBWSxFQUFFO0FBQ3pDLGVBQUssZUFBZTtBQUFBLFFBQ3JCO0FBQUEsTUFDRCxDQUFDO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUNSLGFBQU8sUUFBUSxJQUFJLFFBQVEsS0FBSyxTQUFTLENBQUM7QUFBQSxJQUMzQztBQUFBLElBQ0EsV0FBVyxTQUFTO0FBQ25CLFVBQUksUUFBUTtBQUNaLFVBQUksUUFBUSxLQUFLO0FBRWpCLGNBQVEsS0FBSztBQUFBLFFBQ1o7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxRQUNYO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSx1QkFBdUI7QUFBQSxRQUN2QixjQUFjO0FBQUEsUUFDZDtBQUFBLFFBQ0E7QUFBQSxRQUNBLE1BQU07QUFBQSxVQUNMLE1BQU0sRUFBRSxPQUFPLFFBQVEsT0FBTyw2RUFBNkU7QUFBQSxVQUMzRyxNQUFNLEVBQUUsT0FBTyxRQUFRLE9BQU8sbUVBQW1FO0FBQUEsVUFDakcsTUFBTSxFQUFFLE9BQU8sUUFBUSxPQUFPLCtGQUErRjtBQUFBLFVBQzdILFFBQVEsRUFBRSxPQUFPLFVBQVUsT0FBTywrSkFBK0o7QUFBQSxVQUNqTSxRQUFRLEVBQUUsT0FBTyxVQUFVLE9BQU8sNEtBQTRLO0FBQUEsVUFDOU0sT0FBTyxFQUFFLE9BQU8sU0FBUyxPQUFPLCtEQUErRDtBQUFBLFVBQy9GLE9BQU8sRUFBRSxPQUFPLFNBQVMsT0FBTyx3RUFBd0U7QUFBQSxVQUN4RyxNQUFNLEVBQUUsT0FBTyxRQUFRLE9BQU8sT0FBTztBQUFBLFFBQ3RDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLHFCQUFxQjtBQUFBLFFBQ3JCO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBRUEsR0FBRztBQUFBLFFBRUgsT0FBTyxTQUFVLFFBQVE7QUFDeEIsY0FBSSxDQUFDLE9BQU8sa0JBQWtCO0FBQzdCLG1CQUFPLG1CQUFtQixDQUFDO0FBQUEsVUFDNUI7QUFFQSxjQUFJLE9BQU8sWUFBWSxDQUFDLE9BQU8saUJBQWlCLEtBQUssQ0FBQyxRQUFRLElBQUksT0FBTyxPQUFPLFNBQVMsRUFBRSxHQUFHO0FBQzdGLG1CQUFPLGlCQUFpQixLQUFLLE9BQU8sUUFBUTtBQUFBLFVBQzdDO0FBRUEsaUJBQU8sR0FBRyxRQUFRLFNBQVUsR0FBRztBQUM5QixrQkFBTSxZQUFZLEtBQUssSUFBSTtBQUMzQixrQkFBTSxRQUFRLE9BQU8sV0FBVztBQUFBLFVBQ2pDLENBQUM7QUFFRCxpQkFBTyxHQUFHLFFBQVEsU0FBVSxHQUFHO0FBQzlCLG9CQUFRLE1BQU0sU0FBUyxJQUFJLE9BQU87QUFDbEMsZ0JBQUksV0FBVyxNQUFNO0FBQ3BCLHFCQUFPLFdBQVcsT0FBTztBQUFBLFlBQzFCO0FBQUEsVUFDRCxDQUFDO0FBRUQsY0FBSSxPQUFPLFVBQVUsWUFBWTtBQUNoQyxrQkFBTSxNQUFNO0FBQUEsVUFDYjtBQUFBLFFBQ0Q7QUFBQSxRQUVBLHVCQUF1QixDQUFDLFVBQVUsYUFDakMsSUFBSSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQ2hDLGNBQUksQ0FBQyxTQUFTLEtBQUs7QUFBRztBQUV0QixnQkFBTSxpQkFBaUIsTUFBTTtBQUM1QixrQkFBTSxrQ0FBa0MsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRO0FBQ2hFLGtCQUFJLENBQUMsS0FBSztBQUNULHVCQUFPLE9BQU87QUFDZDtBQUFBLGNBQ0Q7QUFDQSxzQkFBUSxHQUFHO0FBQUEsWUFDWixDQUFDO0FBQUEsVUFDRjtBQUVBLGdCQUFNLGdCQUFnQixNQUFNO0FBQUEsVUFBQztBQUU3QixnQkFBTSxtQkFBbUIsQ0FBQyxNQUFNO0FBQy9CLHFCQUFTLEVBQUUsT0FBTyxRQUFRO0FBQUEsVUFDM0I7QUFFQSxnQkFBTSxPQUFPLDRCQUE0QixTQUFTLElBQUksU0FBUyxLQUFLLEdBQUcsZ0JBQWdCLGVBQWUsZ0JBQWdCO0FBQUEsUUFDdkgsQ0FBQztBQUFBLFFBRUYsbUJBQW1CO0FBQUEsTUFDcEIsQ0FBQztBQUFBLElBQ0Y7QUFBQSxJQUNBLG9CQUFvQixTQUFTO0FBQzVCLFdBQUssT0FBTyxFQUFFLFdBQVcsT0FBTztBQUFBLElBQ2pDO0FBQUEsSUFDQSxpQkFBaUI7QUFDaEIsV0FBSyxPQUFPLEVBQUUsVUFBVSxPQUFPLEtBQUssT0FBTyxFQUFFLFFBQVEsR0FBRyxJQUFJO0FBQzVELFdBQUssT0FBTyxFQUFFLFVBQVUsU0FBUyxLQUFLO0FBQUEsSUFDdkM7QUFBQSxFQUNEO0FBQ0Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
