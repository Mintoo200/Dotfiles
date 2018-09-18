
[[ $- != *i* ]] && return

export LANG=en_US.utf8
export NNTPSERVER="news.epita.fr"

export EDITOR=vim

alias i3lock='i3lock -i ~/afs/.confs/i3lock.png'
alias ls='ls --color=auto'
alias gdb='gdb -p'
alias piscine='cd ~/afs/gauthier.fiorentino/piscine'
alias confExport='~/afs/.confs/confExport.sh'
alias confs='cd ~/afs/.confs'

PS1='\[\e[92m\]\u\e[31m\]@\e[92m\h\e[7m\] \e[5m\]\W \e[0m\]]\$\n>>> '
