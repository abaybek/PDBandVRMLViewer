requirejs.config({
  'baseUrl' : 'src',
  // uncomment the following commented-out block to test the contatenated, 
  // minified PV version. Grunt needs to be run before for this to work.
  
  // paths : {
  //   pv : '/js/bio-pv.min'
  // }
  
});

// on purpose outside of the require block, so we can inspect the viewer object 
// from the JavaScript console.
var viewer;

var pv;
require(['pv'], function(PV) {

pv = PV;
var io = pv.io;
var viewpoint = pv.viewpoint;
var color = pv.color;
var structure;
var structure2;





// var jqxhr = $.getJSON( "data.json", function() {
//   console.log( "success" );
// })
//   .done(function(data) {
//     $.each(data.items, function(i, item) {
//       console.log(item);
//     })

//     console.log( "second success" );
//   })
//   .fail(function() {
//     console.log( "error" );
//   })
//   .always(function() {
//     console.log( "complete" );
//   });
 
// // Perform other work here ...
 
// // Set another completion function for the request above
// jqxhr.complete(function() {
//   console.log( "second complete" );
// });
// console.log(jqxhr)

var _coord = {}
// var _tubes = {}
$.getJSON('data.json', function(data) {
    $.each(data, function(index, element) {
        // $('body').append($('<div>', {
        //     text: element.name
        // }));
        _coord[index] = element
    });
});

// $.getJSON('parser/coord.json', function(data) {
//     // console.log('-----')
//     // console.log(data)
//     // console.log('-----')
//     $.each(data, function(index, element){
//       _tubes[index] = element
//     })
// });

// function getPos(){
// 	return $.getJSON('parser/coord.json');
// }
  
// getPos().done(function(json) {
// 	// now you can use json
// 	var camPos = [];
// 	$.each(json, function(key, val) {
// 	    _tubes[key] = val
// 	});
// })
// .fail(function(){
// 	console.log('Coordinate loading is failed!')
// });


function points() {
  viewer.clear();
  var go = viewer.points('structure', structure, {
                         color: color.byResidueProp('num'),
                         showRelated : '1' });
}

function lines() {
  viewer.clear();
  var go = viewer.lines('structure', structure, {
              color: color.byResidueProp('num'),
              showRelated : '1' });
  go.setSelection(go.select({rnumRange : [15,20]}));
  go.setOpacity(0.5, go.select({rnumRange : [25,30]}));
}

function cartoon() {
  viewer.clear();
  var go = viewer.cartoon('structure', structure, {
      color : color.ssSuccession(), showRelated : '1',
  });
  var rotation = viewpoint.principalAxes(go, 5);
  //go.setSelection(go.select({rtype : 'C' }));
  viewer.setRotation(rotation)
}

function lineTrace() {
  viewer.clear();
  var go = viewer.lineTrace('structure', structure, { showRelated : '1' });
}

function spheres() {
  viewer.clear();
  var go = viewer.spheres('structure', structure, { showRelated : '1' });
}

function sline() {
  viewer.clear();
  var go = viewer.sline('structure', structure,
          { color : color.uniform('red'), showRelated : '1'});
}

function tube() {
  viewer.clear();
  var go = viewer.tube('structure', structure);
  viewer.lines('structure.ca', structure.select({aname :'CA'}),
            { color: color.uniform('blue'), lineWidth : 1,
              showRelated : '1' });
}

function trace() {
  viewer.clear();
  var go = viewer.trace('structure', structure, { showRelated : '1' });

}
function ballsAndSticks() {
  viewer.clear();
  var go = viewer.ballsAndSticks('structure', structure, { showRelated : '1' });
}

function preset() {
  viewer.clear();
  var ligand = structure.select({'rnames' : ['RVP', 'SAH', 'CRO']});

  var go = viewer.lines('structure2', structure2, {
              // color: color.byResidueProp('num'),
              showRelated : '1' });
  go.setSelection(go.select({rnumRange : [15,20]}));
  go.setOpacity(0.5, go.select({rnumRange : [25,30]}));
  
  viewer.ballsAndSticks('structure.ligand', ligand);
  
  viewer.on('viewerReady', function() {
    var hydro_bonds = viewer.customMesh('custom');
    for( var i = 0; i < _coord.x.length; i++){
      hydro_bonds.addSphere([_coord.x[i], _coord.y[i], _coord.z[i]], 0.1, { color : [255, 237, 0]}); 
    }
    // for( var i = 0; i < _tubes.data.length; i++){ // last one didnt calculated
    //   // console.log('--------')
    //   trans = _tubes.data[i].translation;
    //   height = parseFloat(_tubes.data[i].height);
    //   angle = _tubes.data[i].rotation;
  
    //   point = [parseFloat(trans[0]),parseFloat(trans[1]),parseFloat(trans[2])]
    //   rot_angle = [parseFloat(angle[0]),parseFloat(angle[1]),parseFloat(angle[2]),parseFloat(angle[3])]
    //   height = height / 2
    //   point1 = [point[0]+height*Math.cos(rot_angle[0]*rot_angle[3]), point[1]+height, point[2]+height*Math.cos(rot_angle[2]*rot_angle[3])]
    //   point2 = [point[0]-height*Math.cos(rot_angle[0]*rot_angle[3]), point[1]-height, point[2]-height*Math.cos(rot_angle[2]*rot_angle[3])]
      
    //   hydro_bonds.addTube(point1, point2, 0.1, { cap : true, color : 'red' });
    //   hydro_bonds.addSphere(point, 0.2, { color : [0, 237, 255]}); 
    // }
    // helix.addSphere([x,y,z], 0.1, { color : [0, 0, 0]});
    
  });

//   viewer.on('viewerReady', function() {
//   var helix = viewer.customMesh('custom');
//   for (var i = -50; i < 50; ++i) {
//     var x = Math.cos(i * 0.4);
//     var y = i * 0.1;
//     var z = Math.sin(i * 0.4);
//     var color = i * 0.01 + 0.5;
//     // add sphere at the given position with a radius of 0.1
//     helix.addSphere([x,y,z], 0.1, { color : [color, color, 0]});

//     // add a capped tube  in the center of the helix with a
//     // radius of 0.1
//     helix.addTube([0, -5, 0], [0, 5, 0], 0.1,
//                   { cap : true, color : 'blue' });

//     // set zoom to a pre-determined value. Alternatively,
//     // viewer.autoZoom() can be used.
//     viewer.setZoom(14);
//   }
// });

// var obj = viewer.get('custom');
// var sum = vec3.create();
// var count = 0;
// obj.eachCentralAtom(function(atom, transformedPos) {
//   count += 1;
//   vec3.add(sum, sum, transformedPos);
// });
// var center = vec3.scale(sum, sum, 1.0/count);
// console.log('center' , center)
// viewer.setCenter(center);

  viewer.cartoon('structure.protein', structure, { boundingSpheres: false });
}

function load(pdb_id) {
  $.ajax({ url : 'pdbs/'+pdb_id+'.pdb', success : function(data) {  
	structure = io.pdb(data);
	}});
  $.ajax({ url : 'pdbs/'+'mod'+'.pdb', success : function(data) {  
    structure2 = io.pdb(data);
    preset();
    viewer.spheres('helices', structure2.select({rnames : ['RVP', 'SAH']}), { color : color.uniform('red'), radiusMultiplier : 0.3, showRelated : '1' });
    viewer.autoZoom();
  }});
}

function transferase() {
  load('47');
}

function ssSuccession() {
  viewer.forEach(function(go) {
    go.colorBy(color.ssSuccession());
  });
  viewer.requestRedraw();
}

function uniform() {
  viewer.forEach(function(go) {
    go.colorBy(color.uniform([0,1,0]));
  });
  viewer.requestRedraw();
}
function byElement() {
  viewer.forEach(function(go) {
    go.colorBy(color.byElement());
  });
  viewer.requestRedraw();
}

function ss() {
  viewer.forEach(function(go) {
    go.colorBy(color.bySS());
  });
  viewer.requestRedraw();
}

function proInRed() {
  viewer.forEach(function(go) {
    go.colorBy(color.uniform('red'), go.select({rname : 'PRO'}));
  });
  viewer.requestRedraw();
}
function rainbow() {
  viewer.forEach(function(go) {
    go.colorBy(color.rainbow());
  });
  viewer.requestRedraw();
}

function byChain() {
  viewer.forEach(function(go) {
    go.colorBy(color.byChain());
  });
  viewer.requestRedraw();
}

function phong() {
  viewer.options('style', 'phong');
  viewer.requestRedraw();
}

function hemilight() {
  viewer.options('style', 'hemilight');
  viewer.requestRedraw();
}
function showInfo(){
  tmp_v = viewer._cam._rotation;
  tmp_z = viewer._cam._zoom;
  // tmp = viewer._cam._modelView
  // tmp = viewer._cam._camModelView
  for(var i=0; i<4; i++){
      console.log(tmp_v[4*i+0], tmp_v[4*i+1], tmp_v[4*i+2], tmp_v[4*i+3]);
      console.log(tmp_z);
  }
  var int_zoom = Math.round(tmp_z)
  var data = {_camView: tmp_v, _zoom: int_zoom};
  var json = JSON.stringify(data);
  var blob = new Blob([json], {type: "application/json"});
  var url  = URL.createObjectURL(blob);

  var a = document.createElement('a');
  a.download    = "camPos.json";
  a.href        = url;
  a.textContent = "Download Cam Pos";
  document.getElementById('content').appendChild(a);
}

function moveCam(){
  function getArray(){
    return $.getJSON('camPos.json');
  }
  
  getArray().done(function(json) {
    // now you can use json
    var camPos = [];
    console.log()
    $.each(json._camView, function(key, val) {
        camPos[key] = val;
    });
    mtr = camPos;
    viewer.setRotation(mtr, 500);
    viewer.setZoom(json._zoom);
  })
  .fail(function(){
  mtr = [1,0,0,0,1,0,0,0,1];
  viewer.setRotation(mtr, 500);
  });

  var img = document.createElement("IMG");
  img.src = "image.png";
  img.id = "image"
  // $("IMG").css({"background-color": "yellow", "font-size": "200%", "position": "absolute", "top": 0, "bottom": 0}); 
  // img.style.color = "blue";
  document.getElementById('viewer').appendChild(img);

  
}

$(document).foundation();
$('#save-coordinate').click(showInfo);
$('#move-coordinate').click(moveCam);
$('#style-preset').click(preset);
$('#style-cartoon').click(cartoon);
$('#style-tube').click(tube);
$('#style-line-trace').click(lineTrace);
$('#style-sline').click(sline);
$('#style-trace').click(trace);
$('#style-lines').click(lines);
$('#style-balls-and-sticks').click(ballsAndSticks);
$('#style-points').click(points);
$('#style-spheres').click(spheres);
$('#color-uniform').click(uniform);
$('#color-element').click(byElement);
$('#color-chain').click(byChain);
$('#color-ss-succ').click(ssSuccession);
$('#color-ss').click(ss);
$('#phong').click(phong);
$('#hemilight').click(hemilight);
$('#color-rainbow').click(rainbow);
$('#load-from-pdb').change(function() {
  var pdbId = this.value;
  this.value = '';
  this.blur();
  // var url = 'http://www.rcsb.org/pdb/files/' + pdbId + '.pdb';
  // console.log(url)
  // io.fetchPdb(url, function(s) {
  //   structure = s;
  //   cartoon();
  //   viewer.autoZoom();
  // });
  load(pdbId)
});



viewer = pv.Viewer(document.getElementById('viewer'), { 
    width : 'auto', height: 'auto', antialias : true, fog : true,
    outline : true, quality : 'high', style : 'phong',
    selectionColor : 'white', transparency : 'screendoor', 
    background : '#ccc', animateTime: 500, doubleClick : null
});
load(47)

// viewer = pv.Viewer(document.getElementById('viewer'), { 
//     width : 'auto', height: 'auto', antialias : true, fog : true
// });


viewer.on('doubleClick', function(picked) {
  // console.log(picked.connectivity());
  if (picked === null) {
    viewer.fitTo(structure);
    return;
  }
  viewer.setCenter(picked.pos(), 500);
});

window.addEventListener('resize', function() {
      viewer.fitParent();
});

});
