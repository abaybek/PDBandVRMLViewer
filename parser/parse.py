import json
from VrmlParser import utils, modCreate

data = utils.load_vrml('tubessss.wrl')
# data = utils.load_vrml('tubes.wrl')
data = utils.line_output(data)
chanks = utils.make_chanks(data)


result = {}
result['data'] = []
for chank in chanks:
	models = modCreate.make_obj(chank)
	out = None
	if len(models) != 0:		
		out = models[0].__dict__
		out['sphere1'] = models[1].__dict__
		out['sphere2'] = models[2].__dict__
		result['data'].append(out)

with open('coord.json', 'w') as outfile:
    json.dump(result, outfile, sort_keys=True, indent=4)
	# print(models[0])
	# models[0]['sphere1'] = models[1]
	# models[0]['sphere2'] = models[2]
	# print(models[0])
	# for model in models:
		# print(model)
		# print(model.__dict__)
		# print()

	# if model is not None:
	# 	print(model.__dict__)
	# input()