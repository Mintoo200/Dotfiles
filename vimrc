"TODO
"http://vim.wikia.com/wiki/Xterm256_color_names_for_console_Vim
"http://vimdoc.sourceforge.net/htmldoc/syntax.html
"set default register s clipboard
"line wrap in insert

set encoding=utf-8 fileencodings=
syntax on
set number
highlight LineNr ctermbg=235 ctermfg=051
:set numberwidth=4

set autoindent
set mouse=a

set softtabstop=4
set shiftwidth=4
set expandtab
set ww+=<,>
highlight Search ctermbg=187
set hlsearch
highlight SpecialChar ctermfg=59
set list
set listchars=eol:~,tab:>_
highlight Error ctermfg=223
:match Error /\s\+$/
:2match Error /\t/
set list
set listchars=eol:$,tab:>_
highlight SpecialChar ctermfg=118
"set background
highlight Normal ctermbg=232

highlight Comment cterm=italic
highlight Constant ctermfg=121 cterm=bold
highlight String ctermfg=10 cterm=italic
"highlight Character
"highlight Number
"highlight Boolean
"highlight Float
"highlight Identifier
highlight Function ctermfg=70
highlight Statement ctermfg=51
highlight Conditional ctermfg=51
highlight Repeat ctermfg=51
"highlight Label
"highlight Operator ctermfg=LightBlue
"highlight Keyword ctermfg=LightBlue
"highlight Exception
highlight PreProc ctermfg=73 cterm=italic
highlight Type cterm=italic ctermfg=159
"highlight StorageClass
"highlight Structure
"highlight Typedef
"highlight Special
"highlight SpecialChar
"highlight Tag
"highlight Delimiter
"highlight SpecialComment
"highlight Debug
"highlight Underlined
"highlight Ignore
highlight Error ctermfg=White cterm=italic,bold
highlight Todo ctermbg=White ctermfg=Red cterm=italic,bold
highlight NonText ctermfg=238


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

