(() => {
  let getElement = (target, group = 0) => {
    try {
      if (group) {
        return document.querySelectorAll(target);
      } else {
        return document.querySelector(target);
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  let media;

  async function sendVoiceMessage(audio) {
    let currentMessage = {
      media_type: 'audio',
      file: audio,
    };

    currentMessage.temp_id = getRandomInt(10000000, 99999999);
    currentMessage.media_preview = audio;

    media = currentMessage.file;

    console.log('Записал');
    console.log(media);
    ///////////////// modified ////////////////////////////////////////////////////////////////

    let data = new FormData();
    // let upload = document.getElementById('whatsapp_img');
    let user_id = document.getElementById('uid').value;
    console.log(user_id);
    data.append('image', media);
    data.append('id', user_id);
    data.append('submit', '1');
    fetch('/ajax/file_upload.php', {
      method: 'POST',
      body: data,
    })
      .then(
        success =>
          success.text().then(function (text) {
            console.log(text);
            fu.innerHTML = text;
            let fname = text
              .replace('Файл ', '')
              .replace(' успешно загружен', '')
              .trim();
            console.log(fname);
            name.value = fname;
            // let furl = '../' + user_id + '/' + fname;
            let furl =
              URL.createObjectURL(recorder.getBlob()) / +user_id + '/' + fname;
            console.log(furl);
            url.value = furl;
          }) // Handle the success response object
      )
      .catch(
        error => console.log(error) // Handle the error response object
      );

    ///////////////// end modified ////////////////////////////////////////////////////////////

    currentMessage = null;
  }

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  let recorder = null;
  let currentStream = null;
  let currentMedia = null;

  let isVoiceMessageRecording = false;

  let sendVoiceButton = getElement('#send_voice_message');

  let voiceModal = getElement('.whatsapp__voice-message-modal');
  let voicePreview = getElement(
    '.whatsapp__voice-message-modal .whatsapp__voice-preview audio'
  );
  let voiceStop = getElement(
    '.whatsapp__voice-message-modal .whatsapp__stop-rec'
  );
  let voiceSend = getElement(
    '.whatsapp__voice-message-modal .whatsapp__send-rec'
  );
  let voiceCancel = getElement(
    '.whatsapp__voice-message-modal .whatsapp__cancel-rec'
  );

  let mainContainer = getElement('body');

  document.addEventListener('DOMContentLoaded', () => {
    if (sendVoiceButton) {
      sendVoiceButton.addEventListener('click', voiceMessageRec);

      voiceStop.addEventListener('click', voiceMessageRec);
      voiceSend.addEventListener('click', voiceMessageSend);
      voiceCancel.addEventListener('click', voiceMessageCancel);
    }
  });

  const voiceMessageRec = () => {
    if (!isVoiceMessageRecording) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then(stream => {
          recorder = RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/wav',
            disableLogs: true,
          });

          if (recorder === null) {
            alert(
              'Вы запретили браузеру запись аудио и видео на этой странице. Разрешить запись мультимедиа можно в настройках сайта.'
            );
            return;
          }

          currentStream = stream;
          recorder.startRecording();
          isVoiceMessageRecording = true;
          voiceModal.classList.add('active');
          mainContainer.classList.add('blurred');
        })
        .catch(error => {
          alert('При записи сообщения произошла ошибка: ' + error);
        });
    } else {
      recorder.stopRecording(voiceMessageRecCallback);
    }
  };

  const voiceMessageRecCallback = () => {
    currentMedia = new File(
      [recorder.getBlob()],
      'voice_' + getRandomInt(10000000, 99999999) + '.wav',
      {
        type: 'audio/vnd.wave',
      }
    );

    isVoiceMessageRecording = false;

    voiceModal.classList.add('preview');
    voicePreview.src = URL.createObjectURL(recorder.getBlob());

    currentStream.stop();
    recorder.destroy();
    recorder = null;
  };

  const voiceMessageSend = () => {
    voiceModal.classList.remove('active');
    voiceModal.classList.remove('preview');
    mainContainer.classList.remove('blurred');

    sendVoiceMessage(currentMedia);
  };

  const voiceMessageCancel = () => {
    voiceModal.classList.remove('active');
    voiceModal.classList.remove('preview');
    mainContainer.classList.remove('blurred');

    currentMedia = null;
  };

  $('form.checkout-form button').click(function (eventObj) {
    let formData = new FormData($('form.checkout-form')[0]);
    formData.append('media', media);
    for (var value of formData.values()) {
      console.log(value);
    }

    $.ajax({
      type: 'POST',
      url: '/ajax/test.php',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
      success: function (data, textStatus, jqXHR) {
        //process data
      },
      error: function (data, textStatus, jqXHR) {
        //process error msg
      },
    });
    return true;
  });

  const wi = document.querySelector('#whatsapp_img');
  const fu = document.querySelector('#fupload');
  const url = document.querySelector('#url');
  const name = document.querySelector('#fname');

  // wi.addEventListener('change', e => {
  //   upload();
  // });

  // if (wi) {
  //   wi.addEventListener('change', e => {
  //     upload();
  //   });
  // }

  function upload() {
    let data = new FormData();
    let upload = document.getElementById('whatsapp_img');
    let user_id = 1;
    data.append('image', upload.files[0]);
    data.append('id', user_id);
    data.append('submit', '1');
    fetch('/ajax/file_upload.php', {
      method: 'POST',
      body: data,
    })
      .then(
        success =>
          success.text().then(function (text) {
            console.log(text);
            fu.innerHTML = text;
            let fname = text
              .replace('Файл ', '')
              .replace(' успешно загружен', '')
              .trim();
            console.log(fname);
            name.value = fname;
            let furl = 'https://gamma24.su/uploads/' + user_id + '/' + fname;
            console.log(furl);
            url.value = furl;
          }) // Handle the success response object
      )
      .catch(
        error => console.log(error) // Handle the error response object
      );
  }
})();
