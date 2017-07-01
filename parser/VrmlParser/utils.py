import re
		
def make_chanks(data):
	brackets = 0
	braces = 0
	chanks = []
	iter_list = iter(data)
	for val in iter_list:
		chank = []
		if '{' in val:
			while True:
				if '{' in val: braces+=1
				if '}' in val: braces-=1
				if '[' in val: brackets+=1
				if ']' in val: brackets-=1
				chank.append(val)
				if braces == 0 and brackets == 0:
					chanks.append(chank)
					chank = []
					break
				val = next(iter_list)
	return chanks

def line_output(data):
	all_data = []
	for x in data:
		x = x.split(' ')
		x = [value.strip() for value in x if value != '']
		x = [value.strip() for value in x if value != '']
		all_data.append(x)
	return all_data
	
def load_vrml(fname):
	with open(fname) as f:
	    content = f.readlines()
	return content
	# line_output(content)
	# you may also want to remove whitespace characters like `\n` at the end of each line
	# content = [x.strip() for x in content] 