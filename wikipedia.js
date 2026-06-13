chrome.runtime.onMessage.addListener( data => {
  if ( data.type === 'notification' ) {
          chrome.notifications.create(
              '',
              {
                  type: 'basic',
                  title: 'Notify!',
                  message: data.message || 'Notify!',
                  iconUrl: './assets/icons/128.png',
              }
          );
  }
});

chrome.runtime.onMessage.addListener( data => {
  if ( data.type === 'notification' ) {
    notify( data.message );
  }
});

chrome.runtime.onInstalled.addListener( () => {
  chrome.contextMenus.create({
    id: 'notify',
	title: "Recherchez Wikipedia pour '%s'",
	contexts: [ "selection" ]
  });
});

chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
  if ( 'notify' === info.menuItemId ) {
    doSearch( info.selectionText, tab );
  }
} );

function doSearch (search_target,tab)
{
	chrome.tabs.create( {
		url : "https://en.wikipedia.org/wiki/"+encodeURIComponent(search_target),
		selected : true,
		index : tab.index + 1
	} );
};


