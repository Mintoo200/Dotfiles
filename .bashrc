#   ---- ---- ---- ---- ---- ----      Init:   ---- ---- ---- ---- ---- ----

#           Guard on interactive prompt

[[ $- != *i* ]] && return

#           Export global variables

export LANG=en_US.utf8
export NNTPSERVER="news.epita.fr"
export EDITOR=vim

#   ---- ---- ---- ---- ---- ----   Aliases:   ---- ---- ---- ---- ---- ----

alias makeasm='gcc -c -Wall -Wextra -Werror -fPIC lists.S; gcc -fPIC -shared lists.o -g -o liblists.so; gcc -g -Wall -Wextra -Werror -pedantic -std=c99 -L. -llists test.c'
alias execasm='LD_LIBRARY_PATH=.'

alias ls='ls --color=auto'
alias piscine='cd ~/afs/gauthier.fiorentino/piscine'
alias projects='cd ~/afs/gauthier.fiorentino/Ing1_projects'
alias confExport='~/afs/.confs/confExport.sh'
alias confs='cd ~/afs/.confs'
alias Makefile='cp /home/gauthier.fiorentino/afs/gauthier.fiorentino/UsefulCode\
/Makefile Makefile'
alias libMakefile='cp /home/gauthier.fiorentino/afs/gauthier.fiorentino\
/UsefulCode/Makefile_lib Makefile'
alias CSC='/home/mintoo200/Documents/CS_Checker/src/CS_Checker.sh'
alias screen='/home/mintoo200/.screenlayout/epita_normal.sh'
alias grep='grep -n --color'

#           Mistypes

alias maek='make'
alias mkae='make'
alias mak='make'

alias la='ls'
alias l='ls'
alias s='ls'
alias ld='ls'

alias exi='exit'
alias exiy='exit'

#   ---- ---- ---- ---- ---- ----    Colors:   ---- ---- ---- ---- ---- ----

DEFAULT_COLOR="\e[39m"
BLACK="\e[30m"
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
BLUE="\e[34m"
MAGENTA="\e[35m"
CYAN="\e[36m"
LIGHT_GRAY="\e[37m"
DARK_GRAY="\e[90m"
LIGHT_RED="\e[91m"
LIGHT_GREEN="\e[92m"
LIGHT_YELLOW="\e[93m"
LIGHT_BLUE="\e[94m"
LIGHT_MAGENTA="\e[95m"
LIGHT_CYAN="\e[96m"
WHITE="\e[97m"

BG_DEFAULT_COLOR="\e49m"
BG_BLACK="\e[40m"
BG_RED="\e[41m"
BG_GREEN="\e[42m"
BG_YELLOW="\e[43m"
BG_BLUE="\e[44m"
BG_MAGENTA="\e[45m"
BG_CYAN="\e[46m"
BG_LIGHT_GRAY="\e[47m"
BG_DARK_GRAY="\e[100m"
BG_LIGHT_RED="\e[101m"
BG_LIGHT_GREEN="\e[102m"
BG_LIGHT_YELLOW="\e[103m"
BG_LIGHT_BLUE="\e[104m"
BG_LIGHT_MAGENTA="\e[105m"
BG_LIGHT_CYAN="\e[106m"
BG_WHITE="\e[107m"

#   ---- ---- ---- ---- ---- ----      Font:   ---- ---- ---- ---- ---- ----

BOLD="\e[1m"
DIM="\e[2m"
ITALIC="\e[3m"
UNDERLINED="\e[4m"
BLINK="\e[5m"
REVERSE="\e[7m"
HIDDEN="\e[8m"

RESET="\e[0m"
RESET_BOLD="\e[21m"
RESET_DIM="\e[22m"
RESET_ITALIC="\e[23m"
RESET_UNDERLINED="\e[24m"
RESET_BLINK="\e[25m"
RESET_REVERSE="\e[27m"
RESET_HIDDEN="\e[28m"

#   ---- ---- ---- ----    Escape Sequences:   ---- ---- ---- ---- ---- ----

USER="Gauthier"
HOST="\h"
CWD="\W"

#   ---- ---- ---- ---- ---- ----       PSs:   ---- ---- ---- ---- ---- ----

PROMPT_COMMAND=__prompt_command # Gets called before initializing PSs

__get_git_branch() {
    local branch="$(git branch 2> /dev/null)"
    branch=$(sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/' <<< $branch)
    echo "$branch" # equivalent to return when called in subshell
}

__fill_line_with_dashes() {
    let fillsize=${COLUMNS}
    local fill=""
    while [ "$fillsize" -gt "0" ]; do
        fill+="-"
        let fillsize=${fillsize}-1
    done
    echo "${fill}"
}

__get_last_exit_value() {
    local exit_value="$?"
    if [ $exit_value != 0 ]; then
        exit_value="${RED}[${exit_value}]${DEFAULT_COLOR}"      # Add red if exit code non 0
    else
        exit_value="${LIGHT_GREEN}[${exit_value}]${DEFAULT_COLOR}"      # Add red if exit code non 0
    fi
    echo "$exit_value"
}

__get_PS1() {
    local EXIT="$(__get_last_exit_value)" # Has to before any call to evaluate
                                          # last command instead of last call
    PS1=""
    PS1+="${DIM}$(__fill_line_with_dashes)${RESET_DIM}"
    PS1+=" ${EXIT} "
    PS1+="[${LIGHT_GREEN}${USER}"
    PS1+="${RED}@"
    PS1+="${LIGHT_GREEN}${HOST} "
    PS1+="${BLINK}${REVERSE} ${CWD} ${RESET_REVERSE}${RESET_BLINK}"
    PS1+="${CYAN}$(__get_git_branch)${DEFAULT_COLOR}"
    PS1+="] $\n"
    PS1+=">>> "
}

__get_PS0() {
    PS0=""
    PS0+="${DIM}$(__fill_line_with_dashes)${RESET_DIM}"
}

__prompt_command() {
    __get_PS1
    __get_PS0
}

#   ---- ---- ---- ---- ---- ----       Less:  ---- ---- ---- ---- ---- ----

export LESS_TERMCAP_mb=$'\E[32m'        # blink (light cyan)
export LESS_TERMCAP_md=$'\E[1;36m'      # bold (bold + cyan)
export LESS_TERMCAP_me=$'\E[0m'         # end blink, underlined, bold
export LESS_TERMCAP_so=$'\E[2m'         # standout (dim)
export LESS_TERMCAP_se=$'\E[22m'        # end standout (reset dim)
export LESS_TERMCAP_us=$'\E[1m'         # underline (bold)
export LESS_TERMCAP_ue=$'\E[0m'         # end underline (reset bold)
