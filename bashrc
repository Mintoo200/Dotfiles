
[[ $- != *i* ]] && return

export LANG=en_US.utf8
export NNTPSERVER="news.epita.fr"

export EDITOR=vim

alias i3lock='i3lock -i ~/afs/.confs/i3lock.png'
alias ls='ls --color=auto'
alias gdb='gdb -p'
alias piscine='cd ~/afs/gauthier.fiorentino/piscine'
alias confExport='~/afs/.confs/confExport.sh'


PS1='[\033[01;36m\]\u\033[00;31m\]@\033[01;32m\]\h \033[01;37m\]\W]\$ '
