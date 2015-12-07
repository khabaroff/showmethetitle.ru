var siteUrl = location.origin + location.pathname.replace(/\/+$/, ''),
    fbAppId = '1608604249419776',
    shareLink = siteUrl + '/share.php'
        + '?user=' + encodeURIComponent(currentQueryData.username)
        + '&limit=' + encodeURIComponent(currentQueryData.limit)
        + '&' + albumQuery,
    redirectUrl = siteUrl + '/self-close.html'

var shareBtnHref = 'http://www.facebook.com/dialog/feed?'
    + 'app_id=' + fbAppId
    + '&link=' + encodeURIComponent(shareLink)
    + '&redirect_uri=' + encodeURIComponent(redirectUrl)
    + '&display=popup';