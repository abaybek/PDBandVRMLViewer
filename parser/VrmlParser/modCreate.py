class Transform(object):
	def __init__(self):
		pass


def check(val, tmp):
	if 'translation' in val: setattr(tmp, 'translation', [val[1],val[2],val[3]])
	if 'rotation' in val: setattr(tmp, 'rotation', [val[1],val[2],val[3],val[4]])
	if 'height' in val: setattr(tmp, 'height', val[1])
	if 'diffuseColor' in val: setattr(tmp, 'diffuseColor', [val[4],val[5],val[6]])
	if 'specularColor' in val: setattr(tmp, 'specularColor', [val[1],val[2],val[3]])
	if 'shininess:' in val: setattr(tmp, 'shininess', val[1])
	return tmp

def make_obj(chank):
	iter_chank = iter(chank)
	first = False
	done = False
	tmp = None
	obj_lst = []
	for index, val in enumerate(iter_chank):
		if 'Transform' in val and '{' in val and first is not True:
			tmp = Transform()
			first = True
		elif first == True:
			# print(tmp.__dict__)
			if 'Transform' in val and '{' in val or index == len(chank) - 1:
				obj_lst.append(tmp)
				tmp = Transform()
				# return tmp
				# print('---------------------')
			tmp = check(val, tmp)
		# print(val)
		# if tmp is not None:
		# 	print(tmp.__dict__)
		# input()
	# print(obj_lst)
	# obj_lst.append(tmp)
	return obj_lst

