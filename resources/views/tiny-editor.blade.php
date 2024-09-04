@php
    use App\Support\Campaign\ThreatRedFlagLocation;
    use App\Support\Campaign\ThreatRedFlagType;
    $statePath = $getStatePath();
@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field" class="relative z-0">
    @php
        $location = ThreatRedFlagLocation::EmailBody->value;
        $textareaID = 'tiny-editor-' . str_replace(['.', '#', '$'], '-', $getId()) . '-' . rand();
        $redFlagMenuItems = collect(ThreatRedFlagType::cases())
        ->map(fn(ThreatRedFlagType $type) => [
            'type' => 'menuitem',
            'text' => $type->title(),
            'onAction' => "onAction: () => editor.annotator.annotate('redflag', { location: '{$location}', type: '{$type->value}', })"
        ])->toArray();

    @endphp
    {{--    {--}}
    {{--    type: 'menuitem',--}}
    {{--    text: 'Spoofed Links',--}}
    {{--    onAction: () => editor.annotator.annotate('redflag', {--}}
    {{--    location: 'message_body',--}}
    {{--    type: 'spoofed_links',--}}
    {{--    })--}}

    {{--    },--}}
    <div wire:ignore x-ignore ax-load
         ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('tinyeditor', 'amidesfahani/filament-tinyeditor') }}"
         x-load-css="[@js(\Filament\Support\Facades\FilamentAsset::getStyleHref('tiny-css', package: 'amidesfahani/filament-tinyeditor'))]"
         x-load-js="[@js(\Filament\Support\Facades\FilamentAsset::getScriptSrc($getLanguageId(), package: 'amidesfahani/filament-tinyeditor'))]"
         x-data="tinyeditor({
            state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$getStatePath()}')") }},
            statePath: '{{ $statePath }}',
            selector: '#{{ $textareaID }}',
            external_plugins: {{json_encode($getExternalPlugins(), JSON_FORCE_OBJECT)}},
            plugins: '{{ $getPlugins() }}',
            toolbar: '{{ $getToolbar() }}',
            language: '{{ $getInterfaceLanguage() }}',
            language_url: '{{ $getLanguageURL($getInterfaceLanguage()) }}',
            directionality: '{{ $getDirection() }}',
            max_height: {{ $getMaxHeight() }},
            min_height: {{ $getMinHeight() }},
            @if (!filament()->hasDarkModeForced() && $darkMode() == 'media') skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
			content_css: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'),
			@elseif(!filament()->hasDarkModeForced() && $darkMode() == 'class')
			skin: (document.querySelector('html').getAttribute('class').includes('dark') ? 'oxide-dark' : 'oxide'),
			content_css: (document.querySelector('html').getAttribute('class').includes('dark') ? 'dark' : 'default'),
			@elseif(filament()->hasDarkModeForced() || $darkMode() == 'force')
			skin: 'oxide-dark',
			content_css: 'dark',
			@elseif(!filament()->hasDarkModeForced() && $darkMode() == false)
			skin: 'oxide',
			content_css: 'default',
			@elseif(!filament()->hasDarkModeForced() && $darkMode() == 'custom')
			skin: '{{ $skinsUI() }}',
			content_css: '{{ $skinsContent() }}',
			@else
			skin: ((localStorage.getItem('theme') ?? 'system') == 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) ? 'oxide-dark' : 'oxide',
			content_css: ((localStorage.getItem('theme') ?? 'system') == 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) ? 'dark' : 'default', @endif
            toolbar_sticky: {{ $getToolbarSticky() ? 'true' : 'false' }},
            menubar: {{ $getShowMenuBar() ? 'true' : 'false' }},
            relative_urls: {{ $getRelativeUrls() ? 'true' : 'false' }},
            remove_script_host: {{ $getRemoveScriptHost() ? 'true' : 'false' }},
            convert_urls: {{ $getConvertUrls() ? 'true' : 'false' }},
            font_size_formats: '{{ $getFontSizes() }}',
            fontfamily: '{{ $getFontFamilies() }}',
            setup: (editor) => {
                const specialChars = @js($getAutoComplete());

					const onAction = (autocompleteApi, rng, value) => {
						editor.selection.setRng(rng);
						editor.insertContent(value);
						autocompleteApi.hide();
					};

					const getMatchedChars = (pattern) => {
						return specialChars.filter(char => char.text.indexOf(pattern) !== -1);
					};


					editor.ui.registry.addAutocompleter('sp_variables', {
						trigger: '\{\{',
						minChars: 0,
						columns: 1,
						highlightOn: ['char_name'],
						onAction: onAction,
						fetch: (pattern) => {
							return new Promise((resolve) => {
								const results = getMatchedChars(pattern).map(char => ({
									type: 'cardmenuitem',
									value: char.value,
									label: char.text,
									items: [
										{
											type: 'cardcontainer',
											direction: 'vertical',
											items: [
												{
													type: 'cardtext',
													text: char.text,
													name: 'char_name'
												},
												{
													type: 'cardtext',
													text: char.description
												}
											]
										}
									]
								}));
								resolve(results);
							});
						}
					});

					editor.ui.registry.addButton('annotate-redflag', {
                        text: 'Simple Red Flag',
                        onAction: () => {
                          const comment = prompt('Comment with?');
                          editor.annotator.annotate('redflag', {
                            location: 'message_body',
                            type: 'poor_grammar_and_spelling',
                            custom_description: comment
                          });
                          editor.focus();
                        }
                  });

                editor.ui.registry.addMenuButton('redflag', {
                    text: 'Red Flag',
                    fetch: (callback) => {
                        const system = @js($redFlagMenuItems);
                        const items = [
                            {
                                type: 'menuitem',
                                text: 'Clear redflag',
                                onAction: () => editor.annotator.remove('redflag'),
                            },
                            ...system.sort((a, b) => a.text.localeCompare(b.text)).map((d) => ({...d, onAction: eval(d.onAction)})),

                        ]



                        callback(items)
                    }
                });



                editor.on('init', () => {
                      editor.annotator.register('redflag', {
                        persistent: true,
                        directAnnotation: true,
                        decorate: (uid, data) => ({
                          attributes: {
                            'data-red-flag-reason': data.type,
                            'data-red-flag-id': uid,
                            'data-red-flag-custom-description': data.custom_description ? data.custom_description : '',
                            'data-red-flag-tooltip': `${data.type} ${data.custom_description ? data.custom_description : ''}`,
                            'title': data.type,
                            'x-highlight:annotator': 'findStep({value, key}) && shouldHighlight({value, key})',
                            //'data-mce-author': data.author ? data.author : 'anonymous'
                          }
                        })
                      });

                    editor.annotator.annotationChanged('redflag', (state, name, obj) => {
                      if (state === false) {
                        console.log(`We are no longer in a ${name} area`);
                      } else {
                        console.log(`We are now in comment: ${obj.uid}`);
                      }
                    });
                });
            },
            disabled: @js($isDisabled),
            locale: '{{ app()->getLocale() }}',
            placeholder: @js($getPlaceholder()),
            image_list: {!! $getImageList() !!},
            image_advtab: @js($imageAdvtab()),
            image_description: @js($imageDescription()),
            image_class_list: {!! $getImageClassList() !!},
            license_key: '{{ $getLicenseKey() }}',
            custom_configs: @js($getCustomConfigs()),
        })">
        @unless ($isDisabled())
            <input id="{{ $textareaID }}" type="hidden" x-ref="tinymce" placeholder="{{ $getPlaceholder() }}">
        @else
            <div x-html="state"
                 @style(['max-height: ' . $getPreviewMaxHeight() . 'px' => $getPreviewMaxHeight() > 0, 'min-height: ' . $getPreviewMinHeight() . 'px' => $getPreviewMinHeight() > 0])
                 class="block w-full p-3 overflow-y-auto prose transition duration-75 bg-white border border-gray-300 rounded-lg shadow-sm max-w-none opacity-70 dark:prose-invert dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            </div>
        @endunless
    </div>
</x-dynamic-component>

