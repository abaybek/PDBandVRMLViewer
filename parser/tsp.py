#!/usr/bin/python2.6 -i

import sys, os

# autocompletion
import readline
import rlcompleter
readline.parse_and_bind('tab: complete')

# pymol environment
moddir='/opt/pymol-svn/modules'
sys.path.insert(0, moddir)
os.environ['PYMOL_PATH'] = os.path.join(moddir, 'pymol/pymol_path')

# pymol launching: quiet (-q), without GUI (-c) and with arguments from command line
import pymol
pymol.pymol_argv = ['pymol','-qc'] + sys.argv[1:]
pymol.finish_launching()
cmd = pymol.cmd


cmd.load("47.pse")
cmd.save("47.wrl")