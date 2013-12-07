//
// DXStudioPlayer.js - Script to include the player's ActiveX control
// v3.0.0
//

var dxs_util = new Object();
var dxs_minVersion = "3.0.0";
var dxs_currentVersion = "";

var dxs_divids = new Array();
var dxs_wrappers = new Array();
var dxs_foundPlayer = false;

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

function dxs_versionLess(v1,v2)
{
	var v1a=v1.split(".");
	var v2a=v2.split(".");
	if ((v1a==null) || (v1a.length==0) || (v2a==null) || (v2a.length==0))
		return false;
	while(v1a.length<4)
		v1a[v1a.length]="0";
	while(v2a.length<4)
		v2a[v2a.length]="0";
	for(var i=0;i<4;i++)
	{
		if (parseInt(v1a[i])<parseInt(v2a[i]))
			return true;
		if (parseInt(v1a[i])>parseInt(v2a[i]))
			return false;
	}
	return false;
}

function dxs_loadOK()
{
	for(var i=0;i<dxs_wrappers.length;i++)
	{
		dxs_wrappers[i].write(dxs_divids[i]);
	}

}

function dxs_tryLoad()
{
	if (BrowserDetect.browser != "Explorer")
	{
		dxs_foundPlayer=true;
		dxs_loadOK();
		return;
	}
	try
	{
		var player=new ActiveXObject("DXStudioPlayerDLL.DXStudioPlayer");
		if (player != null)
		{
			dxs_foundPlayer=true;
			dxs_currentVersion = player.Version;
			if (dxs_versionLess(dxs_currentVersion,dxs_minVersion))
		        {
				if (confirm("You will need to ugprade your DX Studio Player (from v"+dxs_currentVersion+" to v3 or later) in order to view this content properly.  Please click OK to go to the download page..."))
					window.navigate("http://www.dxstudio.com/download2.aspx");
	               	}
	               else
	               {
        			dxs_loadOK();
	               }
			player = null;
		}
		else
		  	setTimeout("dxs_tryLoad()", 3000);
	}
	catch(e)
	{
		if (!dxs_foundPlayer)
		  	setTimeout("dxs_tryLoad()", 3000);
	}
}


function startDXStudioPlayer()
{
	dxs_tryLoad();
}

function getDXS(name)
{
    if (window.document[name]) 
    {
        return window.document[name];
    }
    if (BrowserDetect.browser != "Explorer")
    {
        if (document.embeds && document.embeds[name])
            return document.embeds[name]; 
    }
    return document.getElementById(name);
}

dxs_util.DXStudioPlayer = function(src, id, target)
{
	if (!document.getElementById)
		return;
	this.src=src;
	this.id=id;
	this.displaySettings='';
	
	dxs_divids[dxs_divids.length]=target;
	dxs_wrappers[dxs_wrappers.length]=this;
}

dxs_util.DXStudioPlayer.prototype = {
	getHTML: function()
	{
		var nodeHTML = "";
		if (BrowserDetect.browser != "Explorer")
		{
			nodeHTML += '<embed name="'+this.id+'" src="'+this.src+'" type="application/x-dxstudio" width="100%" height="100%" pluginspage="http://www.dxstudio.com/downloads/dxstudioplayersetup.exe" ';
			nodeHTML += "DisplaySettings='"+ this.displaySettings +"'";
			nodeHTML += '></embed>';
		}
		else
		{
			nodeHTML += '<object id="'+ this.id +'" '+'classid="clsid:0AC2706C-8623-46F8-9EDD-8F71A897FDAE" width="100%" height="100%">';
			nodeHTML += '<param name="src" value="'+ this.src +'" />';
			nodeHTML += "<param name='DisplaySettings' value='"+ this.displaySettings +"' />";
			nodeHTML += '</object>';
		}
		return nodeHTML;
	},
	write: function(elementId)
	{
		var elem = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
		elem.innerHTML = this.getHTML();
	}
}

var DXStudioPlayer = dxs_util.DXStudioPlayer;
