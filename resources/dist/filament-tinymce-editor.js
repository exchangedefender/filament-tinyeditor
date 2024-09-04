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
      if (!!state?.initialValue) {
        this.initEditor(state.initialValue);
        window.filamentTinyEditors = editors;
      }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vanMvdGlueW1jZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGlueWVkaXRvcih7XG5cdHN0YXRlLFxuXHRzdGF0ZVBhdGgsXG5cdHNlbGVjdG9yLFxuXHRwbHVnaW5zLFxuXHR0b29sYmFyLFxuXHRsYW5ndWFnZSA9IFwiZW5cIixcblx0bGFuZ3VhZ2VfdXJsID0gbnVsbCxcblx0ZGlyZWN0aW9uYWxpdHkgPSBcImx0clwiLFxuXHRtYXhfaGVpZ2h0ID0gMCxcblx0bWluX2hlaWdodCA9IDUwMCxcblx0c2tpbiA9IFwib3hpZGVcIixcblx0Y29udGVudF9jc3MgPSBcImRlZmF1bHRcIixcblx0dG9vbGJhcl9zdGlja3kgPSBmYWxzZSxcblx0bWVudWJhciA9IGZhbHNlLFxuXHRmb250X3NpemVfZm9ybWF0cyA9ICcnLFxuXHRmb250ZmFtaWx5ID0gJycsXG5cdHJlbGF0aXZlX3VybHMgPSB0cnVlLFxuXHRpbWFnZV9saXN0ID0gbnVsbCxcblx0aW1hZ2VfYWR2dGFiID0gZmFsc2UsXG5cdGltYWdlX2Rlc2NyaXB0aW9uID0gZmFsc2UsXG5cdGltYWdlX2NsYXNzX2xpc3QgPSBudWxsLFxuXHRyZW1vdmVfc2NyaXB0X2hvc3QgPSB0cnVlLFxuXHRjb252ZXJ0X3VybHMgPSB0cnVlLFxuXHRjdXN0b21fY29uZmlncyA9IHt9LFxuXHRzZXR1cCA9IG51bGwsXG5cdGRpc2FibGVkID0gZmFsc2UsXG5cdGxvY2FsZSA9IFwiZW5cIixcblx0bGljZW5zZV9rZXkgPSBcImdwbFwiLFxuXHRwbGFjZWhvbGRlciA9IG51bGwsXG5cdGV4dGVybmFsX3BsdWdpbnMgPSB7fSxcblxufSkge1xuXHRsZXQgZWRpdG9ycyA9IHdpbmRvdy5maWxhbWVudFRpbnlFZGl0b3JzIHx8IHt9O1xuXHRyZXR1cm4ge1xuXHRcdGlkOiBudWxsLFxuXHRcdHN0YXRlOiBzdGF0ZSxcblx0XHRzdGF0ZVBhdGg6IHN0YXRlUGF0aCxcblx0XHRzZWxlY3Rvcjogc2VsZWN0b3IsXG5cdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlLFxuXHRcdGxhbmd1YWdlX3VybDogbGFuZ3VhZ2VfdXJsLFxuXHRcdGRpcmVjdGlvbmFsaXR5OiBkaXJlY3Rpb25hbGl0eSxcblx0XHRtYXhfaGVpZ2h0OiBtYXhfaGVpZ2h0LFxuXHRcdG1pbl9oZWlnaHQ6IG1pbl9oZWlnaHQsXG5cdFx0c2tpbjogc2tpbixcblx0XHRjb250ZW50X2NzczogY29udGVudF9jc3MsXG5cdFx0cGx1Z2luczogcGx1Z2lucyxcblx0XHR0b29sYmFyOiB0b29sYmFyLFxuXHRcdHRvb2xiYXJfc3RpY2t5OiB0b29sYmFyX3N0aWNreSxcblx0XHRtZW51YmFyOiBtZW51YmFyLFxuXHRcdHJlbGF0aXZlX3VybHM6IHJlbGF0aXZlX3VybHMsXG5cdFx0cmVtb3ZlX3NjcmlwdF9ob3N0OiByZW1vdmVfc2NyaXB0X2hvc3QsXG5cdFx0Y29udmVydF91cmxzOiBjb252ZXJ0X3VybHMsXG5cdFx0Zm9udF9zaXplX2Zvcm1hdHM6IGZvbnRfc2l6ZV9mb3JtYXRzLFxuXHRcdGZvbnRmYW1pbHk6IGZvbnRmYW1pbHksXG5cdFx0c2V0dXA6IHNldHVwLFxuXHRcdGltYWdlX2xpc3Q6IGltYWdlX2xpc3QsXG5cdFx0aW1hZ2VfYWR2dGFiOiBpbWFnZV9hZHZ0YWIsXG5cdFx0aW1hZ2VfZGVzY3JpcHRpb246IGltYWdlX2Rlc2NyaXB0aW9uLFxuXHRcdGltYWdlX2NsYXNzX2xpc3Q6IGltYWdlX2NsYXNzX2xpc3QsXG5cdFx0bGljZW5zZV9rZXk6IGxpY2Vuc2Vfa2V5LFxuXHRcdGN1c3RvbV9jb25maWdzOiBjdXN0b21fY29uZmlncyxcblx0XHR1cGRhdGVkQXQ6IERhdGUubm93KCksXG5cdFx0ZGlzYWJsZWQsXG5cdFx0bG9jYWxlOiBsb2NhbGUsXG5cdFx0aW5pdCgpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdzdGF0ZSBpcycsIHN0YXRlLmluaXRpYWxWYWx1ZSlcblx0XHRcdGlmKCEhc3RhdGU/LmluaXRpYWxWYWx1ZSkge1xuXHRcdFx0XHR0aGlzLmluaXRFZGl0b3Ioc3RhdGUuaW5pdGlhbFZhbHVlKTtcblx0XHRcdFx0d2luZG93LmZpbGFtZW50VGlueUVkaXRvcnMgPSBlZGl0b3JzO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLiR3YXRjaChcInN0YXRlXCIsIChuZXdTdGF0ZSwgb2xkU3RhdGUpID0+IHtcblxuXG5cdFx0XHRcdGlmIChuZXdTdGF0ZSA9PT0gXCI8cD48L3A+XCIgJiYgbmV3U3RhdGUgIT09IHRoaXMuZWRpdG9yKCkuZ2V0Q29udGVudCgpKSB7XG5cdFx0XHRcdFx0ZWRpdG9yc1t0aGlzLnN0YXRlUGF0aF0uZGVzdHJveSgpO1xuXHRcdFx0XHRcdHRoaXMuaW5pdEVkaXRvcihuZXdTdGF0ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5lZGl0b3IoKS5jb250YWluZXIgJiYgbmV3U3RhdGUgIT09IHRoaXMuZWRpdG9yKCkuZ2V0Q29udGVudCgpKSB7XG5cdFx0XHRcdFx0dGhpcy5lZGl0b3IoKS5yZXNldENvbnRlbnQobmV3U3RhdGUgfHwgXCJcIik7XG5cdFx0XHRcdFx0dGhpcy5wdXRDdXJzb3JUb0VuZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGVkaXRvcigpIHtcblx0XHRcdHJldHVybiB0aW55bWNlLmdldChlZGl0b3JzW3RoaXMuc3RhdGVQYXRoXSk7XG5cdFx0fSxcblx0XHRpbml0RWRpdG9yKGNvbnRlbnQpIHtcblx0XHRcdGxldCBfdGhpcyA9IHRoaXM7XG5cdFx0XHRsZXQgJHdpcmUgPSB0aGlzLiR3aXJlO1xuXG5cdFx0XHR0aW55bWNlLmluaXQoe1xuXHRcdFx0XHRzZWxlY3Rvcjogc2VsZWN0b3IsXG5cdFx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRcdFx0bGFuZ3VhZ2VfdXJsOiBsYW5ndWFnZV91cmwsXG5cdFx0XHRcdGRpcmVjdGlvbmFsaXR5OiBkaXJlY3Rpb25hbGl0eSxcblx0XHRcdFx0c3RhdHVzYmFyOiBmYWxzZSxcblx0XHRcdFx0cHJvbW90aW9uOiBmYWxzZSxcblx0XHRcdFx0bWF4X2hlaWdodDogbWF4X2hlaWdodCxcblx0XHRcdFx0bWluX2hlaWdodDogbWluX2hlaWdodCxcblx0XHRcdFx0c2tpbjogc2tpbixcblx0XHRcdFx0Y29udGVudF9jc3M6IGNvbnRlbnRfY3NzLFxuXHRcdFx0XHRwbHVnaW5zOiBwbHVnaW5zLFxuXHRcdFx0XHRleHRlcm5hbF9wbHVnaW5zOiBleHRlcm5hbF9wbHVnaW5zLFxuXHRcdFx0XHR0b29sYmFyOiB0b29sYmFyLFxuXHRcdFx0XHR0b29sYmFyX3N0aWNreTogdG9vbGJhcl9zdGlja3ksXG5cdFx0XHRcdHRvb2xiYXJfc3RpY2t5X29mZnNldDogNjQsXG5cdFx0XHRcdHRvb2xiYXJfbW9kZTogXCJzbGlkaW5nXCIsXG5cdFx0XHRcdG1lbnViYXI6IG1lbnViYXIsXG5cdFx0XHRcdG1lbnU6IHtcblx0XHRcdFx0XHRmaWxlOiB7IHRpdGxlOiBcIkZpbGVcIiwgaXRlbXM6IFwibmV3ZG9jdW1lbnQgcmVzdG9yZWRyYWZ0IHwgcHJldmlldyB8IGV4cG9ydCBwcmludCB8IGRlbGV0ZWFsbGNvbnZlcnNhdGlvbnNcIiB9LFxuXHRcdFx0XHRcdGVkaXQ6IHsgdGl0bGU6IFwiRWRpdFwiLCBpdGVtczogXCJ1bmRvIHJlZG8gfCBjdXQgY29weSBwYXN0ZSBwYXN0ZXRleHQgfCBzZWxlY3RhbGwgfCBzZWFyY2hyZXBsYWNlXCIgfSxcblx0XHRcdFx0XHR2aWV3OiB7IHRpdGxlOiBcIlZpZXdcIiwgaXRlbXM6IFwiY29kZSB8IHZpc3VhbGFpZCB2aXN1YWxjaGFycyB2aXN1YWxibG9ja3MgfCBzcGVsbGNoZWNrZXIgfCBwcmV2aWV3IGZ1bGxzY3JlZW4gfCBzaG93Y29tbWVudHNcIiB9LFxuXHRcdFx0XHRcdGluc2VydDogeyB0aXRsZTogXCJJbnNlcnRcIiwgaXRlbXM6IFwiaW1hZ2UgbGluayBtZWRpYSBhZGRjb21tZW50IHBhZ2VlbWJlZCBjb2Rlc2FtcGxlIGluc2VydHRhYmxlIHwgY2hhcm1hcCBlbW90aWNvbnMgaHIgfCBwYWdlYnJlYWsgbm9uYnJlYWtpbmcgYW5jaG9yIHRhYmxlb2Zjb250ZW50cyB8IGluc2VydGRhdGV0aW1lXCIgfSxcblx0XHRcdFx0XHRmb3JtYXQ6IHsgdGl0bGU6IFwiRm9ybWF0XCIsIGl0ZW1zOiBcImJvbGQgaXRhbGljIHVuZGVybGluZSBzdHJpa2V0aHJvdWdoIHN1cGVyc2NyaXB0IHN1YnNjcmlwdCBjb2RlZm9ybWF0IHwgc3R5bGVzIGJsb2NrcyBmb250ZmFtaWx5IGZvbnRzaXplIGFsaWduIGxpbmVoZWlnaHQgfCBmb3JlY29sb3IgYmFja2NvbG9yIHwgbGFuZ3VhZ2UgfCByZW1vdmVmb3JtYXRcIiB9LFxuXHRcdFx0XHRcdHRvb2xzOiB7IHRpdGxlOiBcIlRvb2xzXCIsIGl0ZW1zOiBcInNwZWxsY2hlY2tlciBzcGVsbGNoZWNrZXJsYW5ndWFnZSB8IGExMXljaGVjayBjb2RlIHdvcmRjb3VudFwiIH0sXG5cdFx0XHRcdFx0dGFibGU6IHsgdGl0bGU6IFwiVGFibGVcIiwgaXRlbXM6IFwiaW5zZXJ0dGFibGUgfCBjZWxsIHJvdyBjb2x1bW4gfCBhZHZ0YWJsZXNvcnQgfCB0YWJsZXByb3BzIGRlbGV0ZXRhYmxlXCIgfSxcblx0XHRcdFx0XHRoZWxwOiB7IHRpdGxlOiBcIkhlbHBcIiwgaXRlbXM6IFwiaGVscFwiIH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZvbnRfc2l6ZV9mb3JtYXRzOiBmb250X3NpemVfZm9ybWF0cyxcblx0XHRcdFx0Zm9udGZhbWlseTogZm9udGZhbWlseSxcblx0XHRcdFx0Zm9udF9mYW1pbHlfZm9ybWF0czogZm9udGZhbWlseSxcblx0XHRcdFx0cmVsYXRpdmVfdXJsczogcmVsYXRpdmVfdXJscyxcblx0XHRcdFx0cmVtb3ZlX3NjcmlwdF9ob3N0OiByZW1vdmVfc2NyaXB0X2hvc3QsXG5cdFx0XHRcdGNvbnZlcnRfdXJsczogY29udmVydF91cmxzLFxuXHRcdFx0XHRpbWFnZV9saXN0OiBpbWFnZV9saXN0LFxuXHRcdFx0XHRpbWFnZV9hZHZ0YWI6IGltYWdlX2FkdnRhYixcblx0XHRcdFx0aW1hZ2VfZGVzY3JpcHRpb246IGltYWdlX2Rlc2NyaXB0aW9uLFxuXHRcdFx0XHRpbWFnZV9jbGFzc19saXN0OiBpbWFnZV9jbGFzc19saXN0LFxuXHRcdFx0XHRsaWNlbnNlX2tleTogbGljZW5zZV9rZXksXG5cblx0XHRcdFx0Li4uY3VzdG9tX2NvbmZpZ3MsXG5cblx0XHRcdFx0c2V0dXA6IGZ1bmN0aW9uIChlZGl0b3IpIHtcblx0XHRcdFx0XHRpZiAoIXdpbmRvdy50aW55U2V0dGluZ3NDb3B5KSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cudGlueVNldHRpbmdzQ29weSA9IFtdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChlZGl0b3Iuc2V0dGluZ3MgJiYgIXdpbmRvdy50aW55U2V0dGluZ3NDb3B5LnNvbWUoKG9iaikgPT4gb2JqLmlkID09PSBlZGl0b3Iuc2V0dGluZ3MuaWQpKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cudGlueVNldHRpbmdzQ29weS5wdXNoKGVkaXRvci5zZXR0aW5ncyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZWRpdG9yLm9uKFwiYmx1clwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0X3RoaXMudXBkYXRlZEF0ID0gRGF0ZS5ub3coKTtcblx0XHRcdFx0XHRcdF90aGlzLnN0YXRlID0gZWRpdG9yLmdldENvbnRlbnQoe25vX2V2ZW50czogdHJ1ZX0pO1xuXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRlZGl0b3Iub24oXCJpbml0XCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRlZGl0b3JzW190aGlzLnN0YXRlUGF0aF0gPSBlZGl0b3IuaWQ7XG5cdFx0XHRcdFx0XHRpZiAoY29udGVudCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdGVkaXRvci5zZXRDb250ZW50KGNvbnRlbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBzZXR1cCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRzZXR1cChlZGl0b3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHRpbWFnZXNfdXBsb2FkX2hhbmRsZXI6IChibG9iSW5mbywgcHJvZ3Jlc3MpID0+XG5cdFx0XHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKCFibG9iSW5mby5ibG9iKCkpIHJldHVybjtcblxuXHRcdFx0XHRcdFx0Y29uc3QgZmluaXNoQ2FsbGJhY2sgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdCR3aXJlLmdldEZvcm1Db21wb25lbnRGaWxlQXR0YWNobWVudFVybChzdGF0ZVBhdGgpLnRoZW4oKHVybCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmICghdXJsKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZWplY3QoXCJlcnJvclwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSh1cmwpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdGNvbnN0IGVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7fTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgcHJvZ3Jlc3NDYWxsYmFjayA9IChlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHByb2dyZXNzKGUuZGV0YWlsLnByb2dyZXNzKTtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdCR3aXJlLnVwbG9hZChgY29tcG9uZW50RmlsZUF0dGFjaG1lbnRzLiR7c3RhdGVQYXRofWAsIGJsb2JJbmZvLmJsb2IoKSwgZmluaXNoQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIHByb2dyZXNzQ2FsbGJhY2spO1xuXHRcdFx0XHRcdH0pLFxuXG5cdFx0XHRcdGF1dG9tYXRpY191cGxvYWRzOiB0cnVlLFxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR1cGRhdGVFZGl0b3JDb250ZW50KGNvbnRlbnQpIHtcblx0XHRcdHRoaXMuZWRpdG9yKCkuc2V0Q29udGVudChjb250ZW50KTtcblx0XHR9LFxuXHRcdHB1dEN1cnNvclRvRW5kKCkge1xuXHRcdFx0dGhpcy5lZGl0b3IoKS5zZWxlY3Rpb24uc2VsZWN0KHRoaXMuZWRpdG9yKCkuZ2V0Qm9keSgpLCB0cnVlKTtcblx0XHRcdHRoaXMuZWRpdG9yKCkuc2VsZWN0aW9uLmNvbGxhcHNlKGZhbHNlKTtcblx0XHR9LFxuXHR9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFlLFNBQVIsV0FBNEI7QUFBQSxFQUNsQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYLGVBQWU7QUFBQSxFQUNmLGlCQUFpQjtBQUFBLEVBQ2pCLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLE9BQU87QUFBQSxFQUNQLGNBQWM7QUFBQSxFQUNkLGlCQUFpQjtBQUFBLEVBQ2pCLFVBQVU7QUFBQSxFQUNWLG9CQUFvQjtBQUFBLEVBQ3BCLGFBQWE7QUFBQSxFQUNiLGdCQUFnQjtBQUFBLEVBQ2hCLGFBQWE7QUFBQSxFQUNiLGVBQWU7QUFBQSxFQUNmLG9CQUFvQjtBQUFBLEVBQ3BCLG1CQUFtQjtBQUFBLEVBQ25CLHFCQUFxQjtBQUFBLEVBQ3JCLGVBQWU7QUFBQSxFQUNmLGlCQUFpQixDQUFDO0FBQUEsRUFDbEIsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsU0FBUztBQUFBLEVBQ1QsY0FBYztBQUFBLEVBQ2QsY0FBYztBQUFBLEVBQ2QsbUJBQW1CLENBQUM7QUFFckIsR0FBRztBQUNGLE1BQUksVUFBVSxPQUFPLHVCQUF1QixDQUFDO0FBQzdDLFNBQU87QUFBQSxJQUNOLElBQUk7QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFB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
