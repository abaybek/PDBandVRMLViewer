#!/usr/bin/env python
 
# Tell PyMOL to launch quiet (-q), fullscreen (-e) and without internal GUI (-i)
import __main__
__main__.pymol_argv = [ 'pymol', '-qei' ]
 
import pymol
 
# Call the function below before using any PyMOL modules.
pymol.finish_launching()
 
from pymol import cmd
cmd.stereo('walleye')
cmd.set('stereo_shift', 0.23)
cmd.set('stereo_angle', 1.0)