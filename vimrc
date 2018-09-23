"TODO
"syntastic


"HELP TODO
"http://vim.wikia.com/wiki/Xterm256_color_names_for_console_Vim
"http://vimdoc.sourceforge.net/htmldoc/syntax.html


set encoding=utf-8 fileencodings=
syntax on
set number
highlight LineNr ctermbg=235 ctermfg=051
:set numberwidth=4

set autoindent
set mouse=a

set tabstop=8
set softtabstop=4
set shiftwidth=4
set expandtab
set ww+=<,>
set ww+=[,]
highlight Search ctermbg=187
set hlsearch
highlight SpecialChar ctermfg=59
set list
set listchars=eol:~,tab:>_
highlight Error ctermfg=223

set list
set listchars=eol:$,tab:>_
highlight SpecialChar ctermfg=118
"set background
highlight Normal guibg=NONE ctermbg=NONE

highlight Comment cterm=italic
highlight Constant ctermfg=121 cterm=bold
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
highlight FoldColumn ctermbg=235 ctermfg=51

autocmd fileType make setlocal noexpandtab
autocmd fileType make :match Operator /\t/

set colorcolumn=80
highlight ColorColumn ctermbg=DarkRed "050

inoremap <> <><Left>
inoremap () ()<Left>
inoremap [] []<Left>
inoremap "" ""<Left>
inoremap '' ''<Left>
inoremap {} {}<Left>
inoremap {}<Enter> <Enter>{}<Left><Enter><Enter><up><tab>

set foldmethod=syntax
set foldlevelstart=20
set foldcolumn=4
:match Error /\s\+$/
:2match Error /\t/

execute pathogen#infect()

set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
