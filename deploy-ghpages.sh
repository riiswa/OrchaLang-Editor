#!/bin/sh
ng build --prod --base-href "https://riiswa.github.io/OrchaLang-Editor/"
ngh --dir dist/OrchaLang-Editor
echo https://riiswa.github.io/OrchaLang-Editor/