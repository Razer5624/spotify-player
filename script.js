// Spotify APIのクライアントIDとクライアントシークレット
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

// アクセストークンを取得
const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data.access_token;
};

// 現在再生中の曲を取得
const getCurrentTrack = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  });
  const data = await response.json();
  return data.item;
};

// プレーヤーの初期化
const initPlayer = async (accessToken) => {
  const track = await getCurrentTrack(accessToken);

  // トラック情報の設定
  const trackImage = document.getElementById('track-image');
  trackImage.src = track.album.images[0].url;

  const trackName = document.querySelector('h2');
  trackName.textContent = track.name;

  // シークバーの設定
  const seekBar = document.getElementById('seek-bar');
  seekBar.addEventListener('change', (event) => {
    // シークバーの値を反映
  });

  // 再生/一時停止ボタンの設定
  const playPauseButton = document.getElementById('play-pause');
  playPauseButton.addEventListener('click', (event) => {
    // 再生/一時停止処理
  });

  // 巻き戻しボタンの設定
  const rewindButton = document.getElementById('rewind');
  rewindButton.addEventListener('click', (event) => {
    // 巻き戻し処理
  });

  // 早送りボタンの設定
  const fastForwardButton = document.getElementById('fast-forward');
  fastForwardButton.addEventListener('click', (event) => {
    // 早送り処理
  });

  // ボリュームバーの設定
  const volumeBar = document.getElementById('volume-bar');
  volumeBar.addEventListener('change', (event) => {
    // ボリュームバーの値を反映
  });
};

// ログインボタンの設定
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', (event) => {
  // ログインフォームへのURL
  const loginUrl = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&scope=user-read-currently-playing&redirect_uri=' + window.location.href;

  // ログインフォームを開く
  window.location.href = loginUrl;
});

// URLからアクセストークンを取得
const getAccessTokenFromUrl = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return params.get('access_token');
};

// アクセストークンが存在する場合はプレイヤーを初期化
const accessToken = getAccessTokenFromUrl();
if (accessToken) {
  initPlayer(accessToken);
}
