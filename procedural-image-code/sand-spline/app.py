import sys
import json

from numpy import pi
from numpy import array
from numpy.random import random
from numpy.random import randint

from numpy import linspace
from numpy import arange
from numpy import column_stack
from numpy import cos
from numpy import sin

BG = [1,1,1,1]
FRONT = [0,0,0,0.01]

TWOPI = 2.0*pi

SIZE = 1000
PIX = 1.0/SIZE

INUM = 1000

GAMMA = 2.2

STP = 0.00000003


def f(x, y):
  while True:
    yield array([[x,y]])

def spline_iterator():
  from modules.sandSpline import SandSpline

  splines = []
  for _ in range(1):
    guide = f(0.5,0.5)
    pnum = randint(15,100)

    a = random()*TWOPI + linspace(0, TWOPI, pnum)
    # a = linspace(0, TWOPI, pnum)
    path = column_stack((cos(a), sin(a))) * (0.1+random()*0.4)

    scale = arange(pnum).astype('float')*STP

    s = SandSpline(
        guide,
        path,
        INUM,
        scale
        )
    splines.append(s)

  itt = 0
  while True:
    for w, s in enumerate(splines):
      xy = next(s)
      itt += 1
      yield itt, w, xy

def make_spline():
  import sys, traceback
  from fn import Fn
  from sand import Sand
  from modules.helpers import get_colors
  from base64 import b64encode

  sand = Sand(SIZE)
  sand.set_bg(BG)
  sand.set_rgba(FRONT)

  colors = get_colors('./img/dark_cyan_white_black.gif')
  nc = len(colors)

  fn = Fn(prefix='./res/', postfix='.png')
  si = spline_iterator()

  itt_max = 40000
  itt = 0
  output_file_name = fn.name()
  while True:
    try:
      itt, w, xy = next(si)
      rgba = colors[w%nc] + [0.0005]
      sand.set_rgba(rgba)
      sand.paint_dots(xy)
      if itt == itt_max:
        sand.write_to_png(output_file_name, GAMMA)
      # Ugly run-on code because the painting of the image happens
      # sometime after the file is written, dunno why
      if itt >= (itt_max + 40000):
        file = open(output_file_name, 'rb')
        file_data = file.read()
        base64_bytes = b64encode(file_data)
        base64_string = base64_bytes.decode('utf-8')
        return(base64_string)
    except Exception as e:
      print(e)
      # sand.write_to_png(fn.name(), GAMMA)
      traceback.print_exc(file=sys.stdout)

def handler(event, context):
  message = {
    'message': 'Execution started successfully!'
  }

  output_file_data = make_spline()

  # json
  return {
    'statusCode': 200,
    'headers': {'Content-Type': 'application/json'},
    'body': json.dumps(output_file_data)
  }
