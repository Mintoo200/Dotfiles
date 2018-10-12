
[[ $- != *i* ]] && return

export LANG=en_US.utf8
export NNTPSERVER="news.epita.fr"

export EDITOR=vim

cd /home/gauthier.fiorentino/afs/gauthier.fiorentino/
../.confs/fehbg

alias i3lock='i3lock -i ~/afs/.confs/i3lock.png'
alias ls='ls --color=auto'
alias piscine='cd ~/afs/gauthier.fiorentino/piscine'
alias projects='cd ~/afs/gauthier.fiorentino/Ing1_projects'
alias confExport='~/afs/.confs/confExport.sh'
alias confs='cd ~/afs/.confs'
alias Makefile='cp /home/gauthier.fiorentino/afs/gauthier.fiorentino/UsefulCode\
/Makefile Makefile'
alias libMakefile='cp /home/gauthier.fiorentino/afs/gauthier.fiorentino\
/UsefulCode/Makefile_lib Makefile'

alias maek='make'
alias mkae='make'
alias mak='make'

alias la='ls'
alias l='ls'
alias s='ls'
alias ld='ls'

alias exi='exit'
alias exiy='exit'

#PS1='[\e[7;5;92m\]G\e[7;5;93m\]a\e[7;5;94m\]u\e[7;5;95m\]t\e[7;5;96m\]h\e[7;5;96m\]i\e[7;5;97m\]e\e[7;5;90m\]r\e[7;5;91m\]@\e[7;5;92m\]\h \e[7;5;93m\]\W \e[0m\] ]\$\n>>> '
#PS1='\e[92m\]The kernel answered, as Gauthier asked nicely, while in \e[95m\]\W\e[92m\]: \e[0m\]'
PS1='[\e[92m\]Gauthier\e[31m\]@\e[92m\h \e[7m\] \e[5m\]\W \e[0m\] ]\$\n>>> '
