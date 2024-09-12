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
  placeholder = null,
  external_plugins = {}
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
      console.log("state is", state.initialValue);
      if (typeof state?.initialValue !== "undefined") {
        this.initEditor(state.initialValue);
        window.filamentTinyEditors = editors;
      }
      this.$watch("state", (newState, oldState) => {
        if (typeof newState !== "undefined" && typeof oldState === "undefined" && newState !== this.editor().getContent()) {
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
        external_plugins,
        toolbar,
        toolbar_sticky,
        toolbar_sticky_offset: 64,
        toolbar_mode: "sliding",
        menubar,
        menu: {
          file: { title: "File", items: "newdocument restoredraft | preview | export print | deleteallconversations" },
          edit: { title: "Edit", items: "undo redo | cut copy paste pastetext | selectall | searchreplace" },
          view: { title: "View", items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments" },
          insert: { title: "Insert", items: "image link media addcomment pageembed codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime" },
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
            _this.state = editor.getContent({ no_events: true });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vanMvdGlueW1jZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGlueWVkaXRvcih7XG5cdHN0YXRlLFxuXHRzdGF0ZVBhdGgsXG5cdHNlbGVjdG9yLFxuXHRwbHVnaW5zLFxuXHR0b29sYmFyLFxuXHRsYW5ndWFnZSA9IFwiZW5cIixcblx0bGFuZ3VhZ2VfdXJsID0gbnVsbCxcblx0ZGlyZWN0aW9uYWxpdHkgPSBcImx0clwiLFxuXHRtYXhfaGVpZ2h0ID0gMCxcblx0bWluX2hlaWdodCA9IDUwMCxcblx0c2tpbiA9IFwib3hpZGVcIixcblx0Y29udGVudF9jc3MgPSBcImRlZmF1bHRcIixcblx0dG9vbGJhcl9zdGlja3kgPSBmYWxzZSxcblx0bWVudWJhciA9IGZhbHNlLFxuXHRmb250X3NpemVfZm9ybWF0cyA9ICcnLFxuXHRmb250ZmFtaWx5ID0gJycsXG5cdHJlbGF0aXZlX3VybHMgPSB0cnVlLFxuXHRpbWFnZV9saXN0ID0gbnVsbCxcblx0aW1hZ2VfYWR2dGFiID0gZmFsc2UsXG5cdGltYWdlX2Rlc2NyaXB0aW9uID0gZmFsc2UsXG5cdGltYWdlX2NsYXNzX2xpc3QgPSBudWxsLFxuXHRyZW1vdmVfc2NyaXB0X2hvc3QgPSB0cnVlLFxuXHRjb252ZXJ0X3VybHMgPSB0cnVlLFxuXHRjdXN0b21fY29uZmlncyA9IHt9LFxuXHRzZXR1cCA9IG51bGwsXG5cdGRpc2FibGVkID0gZmFsc2UsXG5cdGxvY2FsZSA9IFwiZW5cIixcblx0bGljZW5zZV9rZXkgPSBcImdwbFwiLFxuXHRwbGFjZWhvbGRlciA9IG51bGwsXG5cdGV4dGVybmFsX3BsdWdpbnMgPSB7fSxcblxufSkge1xuXHRsZXQgZWRpdG9ycyA9IHdpbmRvdy5maWxhbWVudFRpbnlFZGl0b3JzIHx8IHt9O1xuXHRyZXR1cm4ge1xuXHRcdGlkOiBudWxsLFxuXHRcdHN0YXRlOiBzdGF0ZSxcblx0XHRzdGF0ZVBhdGg6IHN0YXRlUGF0aCxcblx0XHRzZWxlY3Rvcjogc2VsZWN0b3IsXG5cdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlLFxuXHRcdGxhbmd1YWdlX3VybDogbGFuZ3VhZ2VfdXJsLFxuXHRcdGRpcmVjdGlvbmFsaXR5OiBkaXJlY3Rpb25hbGl0eSxcblx0XHRtYXhfaGVpZ2h0OiBtYXhfaGVpZ2h0LFxuXHRcdG1pbl9oZWlnaHQ6IG1pbl9oZWlnaHQsXG5cdFx0c2tpbjogc2tpbixcblx0XHRjb250ZW50X2NzczogY29udGVudF9jc3MsXG5cdFx0cGx1Z2luczogcGx1Z2lucyxcblx0XHR0b29sYmFyOiB0b29sYmFyLFxuXHRcdHRvb2xiYXJfc3RpY2t5OiB0b29sYmFyX3N0aWNreSxcblx0XHRtZW51YmFyOiBtZW51YmFyLFxuXHRcdHJlbGF0aXZlX3VybHM6IHJlbGF0aXZlX3VybHMsXG5cdFx0cmVtb3ZlX3NjcmlwdF9ob3N0OiByZW1vdmVfc2NyaXB0X2hvc3QsXG5cdFx0Y29udmVydF91cmxzOiBjb252ZXJ0X3VybHMsXG5cdFx0Zm9udF9zaXplX2Zvcm1hdHM6IGZvbnRfc2l6ZV9mb3JtYXRzLFxuXHRcdGZvbnRmYW1pbHk6IGZvbnRmYW1pbHksXG5cdFx0c2V0dXA6IHNldHVwLFxuXHRcdGltYWdlX2xpc3Q6IGltYWdlX2xpc3QsXG5cdFx0aW1hZ2VfYWR2dGFiOiBpbWFnZV9hZHZ0YWIsXG5cdFx0aW1hZ2VfZGVzY3JpcHRpb246IGltYWdlX2Rlc2NyaXB0aW9uLFxuXHRcdGltYWdlX2NsYXNzX2xpc3Q6IGltYWdlX2NsYXNzX2xpc3QsXG5cdFx0bGljZW5zZV9rZXk6IGxpY2Vuc2Vfa2V5LFxuXHRcdGN1c3RvbV9jb25maWdzOiBjdXN0b21fY29uZmlncyxcblx0XHR1cGRhdGVkQXQ6IERhdGUubm93KCksXG5cdFx0ZGlzYWJsZWQsXG5cdFx0bG9jYWxlOiBsb2NhbGUsXG5cdFx0aW5pdCgpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdzdGF0ZSBpcycsIHN0YXRlLmluaXRpYWxWYWx1ZSlcblx0XHRcdGlmKHR5cGVvZiBzdGF0ZT8uaW5pdGlhbFZhbHVlICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHRoaXMuaW5pdEVkaXRvcihzdGF0ZS5pbml0aWFsVmFsdWUpO1xuXHRcdFx0XHR3aW5kb3cuZmlsYW1lbnRUaW55RWRpdG9ycyA9IGVkaXRvcnM7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuJHdhdGNoKFwic3RhdGVcIiwgKG5ld1N0YXRlLCBvbGRTdGF0ZSkgPT4ge1xuXG5cblx0XHRcdFx0aWYgKCh0eXBlb2YgbmV3U3RhdGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBvbGRTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpICYmIG5ld1N0YXRlICE9PSB0aGlzLmVkaXRvcigpLmdldENvbnRlbnQoKSkge1xuXHRcdFx0XHRcdGVkaXRvcnNbdGhpcy5zdGF0ZVBhdGhdLmRlc3Ryb3koKTtcblx0XHRcdFx0XHR0aGlzLmluaXRFZGl0b3IobmV3U3RhdGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuZWRpdG9yKCkuY29udGFpbmVyICYmIG5ld1N0YXRlICE9PSB0aGlzLmVkaXRvcigpLmdldENvbnRlbnQoKSkge1xuXHRcdFx0XHRcdHRoaXMuZWRpdG9yKCkucmVzZXRDb250ZW50KG5ld1N0YXRlIHx8IFwiXCIpO1xuXHRcdFx0XHRcdHRoaXMucHV0Q3Vyc29yVG9FbmQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRlZGl0b3IoKSB7XG5cdFx0XHRyZXR1cm4gdGlueW1jZS5nZXQoZWRpdG9yc1t0aGlzLnN0YXRlUGF0aF0pO1xuXHRcdH0sXG5cdFx0aW5pdEVkaXRvcihjb250ZW50KSB7XG5cdFx0XHRsZXQgX3RoaXMgPSB0aGlzO1xuXHRcdFx0bGV0ICR3aXJlID0gdGhpcy4kd2lyZTtcblxuXHRcdFx0dGlueW1jZS5pbml0KHtcblx0XHRcdFx0c2VsZWN0b3I6IHNlbGVjdG9yLFxuXHRcdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2UsXG5cdFx0XHRcdGxhbmd1YWdlX3VybDogbGFuZ3VhZ2VfdXJsLFxuXHRcdFx0XHRkaXJlY3Rpb25hbGl0eTogZGlyZWN0aW9uYWxpdHksXG5cdFx0XHRcdHN0YXR1c2JhcjogZmFsc2UsXG5cdFx0XHRcdHByb21vdGlvbjogZmFsc2UsXG5cdFx0XHRcdG1heF9oZWlnaHQ6IG1heF9oZWlnaHQsXG5cdFx0XHRcdG1pbl9oZWlnaHQ6IG1pbl9oZWlnaHQsXG5cdFx0XHRcdHNraW46IHNraW4sXG5cdFx0XHRcdGNvbnRlbnRfY3NzOiBjb250ZW50X2Nzcyxcblx0XHRcdFx0cGx1Z2luczogcGx1Z2lucyxcblx0XHRcdFx0ZXh0ZXJuYWxfcGx1Z2luczogZXh0ZXJuYWxfcGx1Z2lucyxcblx0XHRcdFx0dG9vbGJhcjogdG9vbGJhcixcblx0XHRcdFx0dG9vbGJhcl9zdGlja3k6IHRvb2xiYXJfc3RpY2t5LFxuXHRcdFx0XHR0b29sYmFyX3N0aWNreV9vZmZzZXQ6IDY0LFxuXHRcdFx0XHR0b29sYmFyX21vZGU6IFwic2xpZGluZ1wiLFxuXHRcdFx0XHRtZW51YmFyOiBtZW51YmFyLFxuXHRcdFx0XHRtZW51OiB7XG5cdFx0XHRcdFx0ZmlsZTogeyB0aXRsZTogXCJGaWxlXCIsIGl0ZW1zOiBcIm5ld2RvY3VtZW50IHJlc3RvcmVkcmFmdCB8IHByZXZpZXcgfCBleHBvcnQgcHJpbnQgfCBkZWxldGVhbGxjb252ZXJzYXRpb25zXCIgfSxcblx0XHRcdFx0XHRlZGl0OiB7IHRpdGxlOiBcIkVkaXRcIiwgaXRlbXM6IFwidW5kbyByZWRvIHwgY3V0IGNvcHkgcGFzdGUgcGFzdGV0ZXh0IHwgc2VsZWN0YWxsIHwgc2VhcmNocmVwbGFjZVwiIH0sXG5cdFx0XHRcdFx0dmlldzogeyB0aXRsZTogXCJWaWV3XCIsIGl0ZW1zOiBcImNvZGUgfCB2aXN1YWxhaWQgdmlzdWFsY2hhcnMgdmlzdWFsYmxvY2tzIHwgc3BlbGxjaGVja2VyIHwgcHJldmlldyBmdWxsc2NyZWVuIHwgc2hvd2NvbW1lbnRzXCIgfSxcblx0XHRcdFx0XHRpbnNlcnQ6IHsgdGl0bGU6IFwiSW5zZXJ0XCIsIGl0ZW1zOiBcImltYWdlIGxpbmsgbWVkaWEgYWRkY29tbWVudCBwYWdlZW1iZWQgY29kZXNhbXBsZSBpbnNlcnR0YWJsZSB8IGNoYXJtYXAgZW1vdGljb25zIGhyIHwgcGFnZWJyZWFrIG5vbmJyZWFraW5nIGFuY2hvciB0YWJsZW9mY29udGVudHMgfCBpbnNlcnRkYXRldGltZVwiIH0sXG5cdFx0XHRcdFx0Zm9ybWF0OiB7IHRpdGxlOiBcIkZvcm1hdFwiLCBpdGVtczogXCJib2xkIGl0YWxpYyB1bmRlcmxpbmUgc3RyaWtldGhyb3VnaCBzdXBlcnNjcmlwdCBzdWJzY3JpcHQgY29kZWZvcm1hdCB8IHN0eWxlcyBibG9ja3MgZm9udGZhbWlseSBmb250c2l6ZSBhbGlnbiBsaW5laGVpZ2h0IHwgZm9yZWNvbG9yIGJhY2tjb2xvciB8IGxhbmd1YWdlIHwgcmVtb3ZlZm9ybWF0XCIgfSxcblx0XHRcdFx0XHR0b29sczogeyB0aXRsZTogXCJUb29sc1wiLCBpdGVtczogXCJzcGVsbGNoZWNrZXIgc3BlbGxjaGVja2VybGFuZ3VhZ2UgfCBhMTF5Y2hlY2sgY29kZSB3b3JkY291bnRcIiB9LFxuXHRcdFx0XHRcdHRhYmxlOiB7IHRpdGxlOiBcIlRhYmxlXCIsIGl0ZW1zOiBcImluc2VydHRhYmxlIHwgY2VsbCByb3cgY29sdW1uIHwgYWR2dGFibGVzb3J0IHwgdGFibGVwcm9wcyBkZWxldGV0YWJsZVwiIH0sXG5cdFx0XHRcdFx0aGVscDogeyB0aXRsZTogXCJIZWxwXCIsIGl0ZW1zOiBcImhlbHBcIiB9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb250X3NpemVfZm9ybWF0czogZm9udF9zaXplX2Zvcm1hdHMsXG5cdFx0XHRcdGZvbnRmYW1pbHk6IGZvbnRmYW1pbHksXG5cdFx0XHRcdGZvbnRfZmFtaWx5X2Zvcm1hdHM6IGZvbnRmYW1pbHksXG5cdFx0XHRcdHJlbGF0aXZlX3VybHM6IHJlbGF0aXZlX3VybHMsXG5cdFx0XHRcdHJlbW92ZV9zY3JpcHRfaG9zdDogcmVtb3ZlX3NjcmlwdF9ob3N0LFxuXHRcdFx0XHRjb252ZXJ0X3VybHM6IGNvbnZlcnRfdXJscyxcblx0XHRcdFx0aW1hZ2VfbGlzdDogaW1hZ2VfbGlzdCxcblx0XHRcdFx0aW1hZ2VfYWR2dGFiOiBpbWFnZV9hZHZ0YWIsXG5cdFx0XHRcdGltYWdlX2Rlc2NyaXB0aW9uOiBpbWFnZV9kZXNjcmlwdGlvbixcblx0XHRcdFx0aW1hZ2VfY2xhc3NfbGlzdDogaW1hZ2VfY2xhc3NfbGlzdCxcblx0XHRcdFx0bGljZW5zZV9rZXk6IGxpY2Vuc2Vfa2V5LFxuXG5cdFx0XHRcdC4uLmN1c3RvbV9jb25maWdzLFxuXG5cdFx0XHRcdHNldHVwOiBmdW5jdGlvbiAoZWRpdG9yKSB7XG5cdFx0XHRcdFx0aWYgKCF3aW5kb3cudGlueVNldHRpbmdzQ29weSkge1xuXHRcdFx0XHRcdFx0d2luZG93LnRpbnlTZXR0aW5nc0NvcHkgPSBbXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoZWRpdG9yLnNldHRpbmdzICYmICF3aW5kb3cudGlueVNldHRpbmdzQ29weS5zb21lKChvYmopID0+IG9iai5pZCA9PT0gZWRpdG9yLnNldHRpbmdzLmlkKSkge1xuXHRcdFx0XHRcdFx0d2luZG93LnRpbnlTZXR0aW5nc0NvcHkucHVzaChlZGl0b3Iuc2V0dGluZ3MpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVkaXRvci5vbihcImJsdXJcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdF90aGlzLnVwZGF0ZWRBdCA9IERhdGUubm93KCk7XG5cdFx0XHRcdFx0XHRfdGhpcy5zdGF0ZSA9IGVkaXRvci5nZXRDb250ZW50KHtub19ldmVudHM6IHRydWV9KTtcblxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0ZWRpdG9yLm9uKFwiaW5pdFwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0ZWRpdG9yc1tfdGhpcy5zdGF0ZVBhdGhdID0gZWRpdG9yLmlkO1xuXHRcdFx0XHRcdFx0aWYgKGNvbnRlbnQgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRlZGl0b3Iuc2V0Q29udGVudChjb250ZW50KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygc2V0dXAgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0c2V0dXAoZWRpdG9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0aW1hZ2VzX3VwbG9hZF9oYW5kbGVyOiAoYmxvYkluZm8sIHByb2dyZXNzKSA9PlxuXHRcdFx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHRcdGlmICghYmxvYkluZm8uYmxvYigpKSByZXR1cm47XG5cblx0XHRcdFx0XHRcdGNvbnN0IGZpbmlzaENhbGxiYWNrID0gKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHQkd2lyZS5nZXRGb3JtQ29tcG9uZW50RmlsZUF0dGFjaG1lbnRVcmwoc3RhdGVQYXRoKS50aGVuKCh1cmwpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIXVybCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVqZWN0KFwiZXJyb3JcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUodXJsKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRjb25zdCBlcnJvckNhbGxiYWNrID0gKCkgPT4ge307XG5cblx0XHRcdFx0XHRcdGNvbnN0IHByb2dyZXNzQ2FsbGJhY2sgPSAoZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRwcm9ncmVzcyhlLmRldGFpbC5wcm9ncmVzcyk7XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHQkd2lyZS51cGxvYWQoYGNvbXBvbmVudEZpbGVBdHRhY2htZW50cy4ke3N0YXRlUGF0aH1gLCBibG9iSW5mby5ibG9iKCksIGZpbmlzaENhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBwcm9ncmVzc0NhbGxiYWNrKTtcblx0XHRcdFx0XHR9KSxcblxuXHRcdFx0XHRhdXRvbWF0aWNfdXBsb2FkczogdHJ1ZSxcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0dXBkYXRlRWRpdG9yQ29udGVudChjb250ZW50KSB7XG5cdFx0XHR0aGlzLmVkaXRvcigpLnNldENvbnRlbnQoY29udGVudCk7XG5cdFx0fSxcblx0XHRwdXRDdXJzb3JUb0VuZCgpIHtcblx0XHRcdHRoaXMuZWRpdG9yKCkuc2VsZWN0aW9uLnNlbGVjdCh0aGlzLmVkaXRvcigpLmdldEJvZHkoKSwgdHJ1ZSk7XG5cdFx0XHR0aGlzLmVkaXRvcigpLnNlbGVjdGlvbi5jb2xsYXBzZShmYWxzZSk7XG5cdFx0fSxcblx0fTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZSxTQUFSLFdBQTRCO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxlQUFlO0FBQUEsRUFDZixpQkFBaUI7QUFBQSxFQUNqQixhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxjQUFjO0FBQUEsRUFDZCxpQkFBaUI7QUFBQSxFQUNqQixVQUFVO0FBQUEsRUFDVixvQkFBb0I7QUFBQSxFQUNwQixhQUFhO0FBQUEsRUFDYixnQkFBZ0I7QUFBQSxFQUNoQixhQUFhO0FBQUEsRUFDYixlQUFlO0FBQUEsRUFDZixvQkFBb0I7QUFBQSxFQUNwQixtQkFBbUI7QUFBQSxFQUNuQixxQkFBcUI7QUFBQSxFQUNyQixlQUFlO0FBQUEsRUFDZixpQkFBaUIsQ0FBQztBQUFBLEVBQ2xCLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFNBQVM7QUFBQSxFQUNULGNBQWM7QUFBQSxFQUNkLGNBQWM7QUFBQSxFQUNkLG1CQUFtQixDQUFDO0FBRXJCLEdBQUc7QUFDRixNQUFJLFVBQVUsT0FBTyx1QkFBdUIsQ0FBQztBQUM3QyxTQUFPO0FBQUEsSUFDTixJ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
