"HELP TODO
"http://vim.wikia.com/wiki/Xterm256_color_names_for_console_Vim
"http://vimdoc.sourceforge.net/htmldoc/syntax.html

set encoding=utf-8 fileencodings=
syntax on

                                                         " Set numering column
set number relativenumber
highlight LineNr ctermbg=235 ctermfg=060
set numberwidth=4

set autoindent

set mouse=a

                                                           " Set tab expansion
set tabstop=8
set softtabstop=4
set shiftwidth=4
set expandtab

set ww+=<,>,[,]

                                                        " Set search highlight
highlight Search ctermbg=187
set hlsearch

                                                      " Set special characters
highlight SpecialChar ctermfg=118
set list
set listchars=eol:$,tab:>_,trail:!

highlight Error ctermfg=223

                                                        " Set position markers
set cursorline
set cursorcolumn

                                            " Bind F10 to category recognition
map <F10> :echo "hi<" . synIDattr(synID(line("."),col("."),1),"name") . '> trans<'
\ . synIDattr(synID(line("."),col("."),0),"name") . "> lo<"
\ . synIDattr(synIDtrans(synID(line("."),col("."),1)),"name") . ">"<CR>

                                              " Add self correction on W and Q
cnoreabbrev W w
cnoreabbrev Q q
cnoreabbrev Wq wq
                             " Add macros on relative and absolute line number
cnoreabbrev srelative set nonu rnu
cnoreabbrev relative set nu rnu
cnoreabbrev absolute set nu nornu

                                                                " Color scheme
highlight Normal guibg=NONE ctermbg=NONE
highlight CursorLineNR cterm=bold ctermfg=051 ctermbg=235
highlight CursorColumn ctermbg=236
highlight Comment cterm=italic
highlight Constant ctermfg=158 cterm=bold
highlight String ctermfg=10 cterm=italic
highlight Function ctermfg=70
highlight Statement ctermfg=51
highlight Conditional ctermfg=51
highlight Repeat ctermfg=51
highlight PreProc ctermfg=73 cterm=italic
highlight Type cterm=italic ctermfg=159
highlight Error ctermfg=White cterm=italic,bold
highlight Todo ctermbg=White ctermfg=Red cterm=italic,bold
highlight NonText ctermfg=238
highlight Visual cterm=bold ctermbg=36
highlight FoldColumn ctermbg=235 ctermfg=60
highlight Label ctermfg=51
highlight cStatement ctermfg=51
highlight cOperator ctermfg=51
highlight cConstant ctermfg=159 cterm=bold
highlight cNumber ctermfg=159 cterm=bold

                                           " Set custom Settings for Mkaefiles
autocmd fileType make setlocal noexpandtab
autocmd fileType make :match Operator /\t/

                                                          " Disable ACP plugin
let g:acp_enableAtStartup = 0

                                                        " Set 80 column marker
set colorcolumn=80
highlight ColorColumn ctermbg=DarkRed "050

                                                                  " Set macros
inoremap <> <><Left>
inoremap () ()<Left>
inoremap [] []<Left>
inoremap "" ""<Left>
inoremap '' ''<Left>
inoremap {} {}<Left>
inoremap {}<Enter> <Enter>{}<Left><Enter><Enter><up><tab>
inoremap <C-Tab> <C-N>
nnoremap <C><C> :resize 100<Enter>
map E ge

                                                                   " Set folds
set foldmethod=syntax
set foldlevelstart=20
set foldcolumn=4

" Set update time
set updatetime=100

                                    " Set matches for trailing spaces and tabs
:match Error /\s\+$/
:2match Error /\t/

                                                      " Execute plugin manager
execute pathogen#infect()
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
