var edgesS = []
var nodesS = []

//from here to 'var interests' code is the most IMPORTANT part
function Main(){
  var data;

  this.start = function(){
  	  var request = new XMLHttpRequest();
  	  request.open("GET", "/database/edges1.json", false);
  	  request.send(null)
  	  var mydata1  = JSON.parse(request.responseText);
  	  var request1 = new XMLHttpRequest();
  	  request1.open("GET", "/database/nodes1.json", false);
  	  request1.send(null)
  	  var mydata2  = JSON.parse(request1.responseText);

  	  var mydata = mydata2.concat(mydata1);
  	  console.log(mydata);
  	  this.data = mydata;


      var interests = ['Scuba diving','River rafting','Bungee jumping','Skiing','Trekking','Ice skating','Surfing','Racing',
                   'Gymnastics','Hunting','Cook foods in disguise','Painting','Graffiti art','Creative writing','Dancing/choreography',
                   'Singing/composing music','Sculpting','Model building','Interior decorating','Jewelry-making','Computer games',
                   'Video gaming','Social networking','Keeping virtual pets','Creating software','Internet browsing','Blogging',
                   'Building computers and robots','Fishing','Archery','Boating','Traveling','Camping','Kayaking','Kart racing','Golfing',
                   'Swimming','Skateboarding','Playing cards','Tarot card reading','Playing board games','Watching movies','Cubing','Bowling',
                   'Billiards','Ping pong/table tennis','Pottery','Birdwatching','Geocaching','Photography','Cloud watching','Stargazing',
                   'People watching','Herping (looking for reptiles)','Amateur meteorology','Reading','Yoga','Meditation',
                   'Exercising and body building','Participating in marathons','Jumping rope','Swimming','Martial arts','Fitness counseling',
                   'Recipe creation'];

      var nodes = [];
      x = 1280 - 20;
      y = 720 - 15;
      numberOfNodeY = 30;
      numberOfNodeX = 53;
      addX = x / numberOfNodeX;
      addY = y / numberOfNodeY;
      startX = 20;
      startY = 15;

      mydata2.forEach(function (node){
        var random = Math.floor((Math.random() * 10) + 5);
        var fewInterests = getUnique(random, interests);
        nodes.push(new Node(node.id, node.label, fewInterests, startX, startY));
        startX += addX;
        if(startX >= x){
          startX = 20;
          startY += addY;
        }
      });

      var edges = [];

      mydata.forEach(function (edge){
        edges.push(new Edge(nodes[nodes.findIndex(i => i.id === edge.Source)],edge.Weight,nodes[nodes.findIndex(i => i.id === edge.Target)], false));
      });

      nodesS = nodes;
      edgesS = edges;
  }

//this is very important
  this.getData = function(){
  	return this.data;
  }

  this.animate = function(){
    playAnimation = true;
    maxNumberOfNewFriendships = $('input[name="maxNumberOfNewFriendships"]').val()
    precentageOfFriends = $('input[name="precentageOfFriends"]').val()
    var graph = new Graph(nodesS, edgesS,maxNumberOfNewFriendships,precentageOfFriends);
    var ir = 0;
    repeatOften();
    function repeatOften(){
      if(playAnimation){
        console.log("i co2?")
        graph.updateEdges();
        if(ir % 7 == 0) graph.addNewEdge();
        ir++;
        requestAnimationFrame(repeatOften);
      }
    }
  }
}

//this is also very important
function getInData(x){
	return {data : x};
}

function getUnique(count, array) {
  // Make a copy of the array
  var tmp = array.slice(array);
  var ret = [];

  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * tmp.length);
    var removed = tmp.splice(index, 1);
    // Since we are only removing one element
    ret.push(removed[0]);
  }
  return ret;
}
