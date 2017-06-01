// Simple emulation of cordova plugins for desktop
// @author Manolo Carrasco <manolo@apache.org>

// REGISTER Cordova
setTimeout(() => {
	document.dispatchEvent(new Event('deviceready'), {});
}, 1000)

// DEVICE
device = {
	platform: 'Desktop ' + window.navigator.userAgent.replace(/.*?(Trident|Edge|Firefox|Chrome|Safari).*/, '$1'),
	cordova: 'desktop-emulation',
	manufacturer: window.navigator.platform,
	model: navigator.userAgent.replace(/.*\((.*?);((.*?)[;\)])?.*/, '$1$3'),
	available: true,
	version: window.navigator.userAgent.replace(/.*?(Trident|Edge|Firefox|Chrome|Safari)\/([\d\.]+).*/, '$2')
}

// NETWORK
navigator.network = {
	connection: {
		type: navigator.onLine ? 'wifi' : undefined
	}
}

// LIFECYCLE
document.addEventListener('visibilitychange', () => {
	document.dispatchEvent(new CustomEvent(document.hidden ? 'pause' : 'resume'));
}, false);


// CAMERA
navigator.camera = {
	getPicture: function(successCallback, errorCallback, cameraOptions) {
		var input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.style.opacity = 0;
		input.onchange = () => {
		   var reader = new FileReader();
           reader.onload = function (e) {
        	   successCallback(e.target.result);
	       }
           reader.readAsDataURL(input.files[0]);
           document.body.removeChild(input);
		}
		document.body.appendChild(input);
		input.click();
	}
}

// CONTACTS
var myContacts = [{
  id: '0',
  rawid: '1',
  name: 'manolo',
  displayName: 'M Manolo',
  nickname: 'dodotis',
  phoneNumbers: [{id: 1, type: 'email', value:'660111111'}],
  emails:  [{id: 1, type: 'email', value:'mcm@demo.com'}],
  addresses: [],
  ims: [],
  organizations: [],
  birthday: [],
  note: 'my best friend',
  photos: [],
  categories: [],
  urls: []
}, {
  id: '1',
  rawid: '1',
  name: 'jose',
  displayName: 'J Jose',
  nickname: 'tocho',
  phoneNumbers: [{id: 1, type: 'email', value:'660222222'}],
  emails:  [{id: 1, type: 'email', value:'tj@demo.com'}],
  addresses: [],
  ims: [],
  organizations: [],
  birthday: [],
  note: 'my work mate',
  photos: [],
  categories: [],
  urls: []
}];

function save(cb) {
	var id = parseInt(this.id);
	if (!myContacts[id]) {
	   this.id = myContacts.length;
	   myContacts.push(this);
	}
	cb(this);
}
function clone() {
	var r = JSON.parse(JSON.stringify(this));
	r.save = save;
	r.clone = clone;
	return r;
}

navigator.contacts = {
  create: function() {
	  return clone.call({});
  },

  find: function(fields, success, error, options) {
	success(myContacts);
  },

  pickContact: function() {
	window.alert("Not implemented in desktop emulation yet");
  }
}

function ContactField(type, value, pref) {
	this.type = type;
	this.value = value;
	this.pref = pref;
}
