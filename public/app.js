(() => {
  'use strict';
  const SITE_URL = 'https://jjoggomi-bot.pages.dev/';
  const $ = id => document.getElementById(id);
  const cleanNick = value => Array.from(String(value || '').normalize('NFC')
    .replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2066-\u2069\ufeff]/g, '')
    .replace(/\s+/g, ' ').trim()).slice(0, 20).join('');
  const from = cleanNick(new URLSearchParams(location.search).get('from'));
  if (from) {
    $('from-name').textContent = from;
    $('from-banner').hidden = false;
    document.title = `${from}님의 초대장 — 쪼꼬미`;
  }
  const input = $('nickname');
  input.addEventListener('input', () => {
    $('preview-name').textContent = cleanNick(input.value) || '당신';
    $('invite-result').hidden = true;
    $('nickname-message').textContent = '최대 20글자로 표시돼요.';
    $('nickname-message').classList.remove('error');
    input.removeAttribute('aria-invalid');
  });
  $('invite-form').addEventListener('submit', event => {
    event.preventDefault();
    const nickname = cleanNick(input.value);
    if (!nickname) {
      $('nickname-message').textContent = '닉네임을 입력해 주세요.';
      $('nickname-message').classList.add('error');
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    input.value = nickname;
    $('preview-name').textContent = nickname;
    const link = new URL(SITE_URL);
    link.searchParams.set('from', nickname);
    $('generated-link').value = link.href;
    $('copy-status').textContent = '복사해서 친구나 서버 관리자에게 보내 주세요.';
    $('invite-result').hidden = false;
    $('nickname-message').textContent = '초대장이 완성됐어요.';
  });
  async function copyText(text) {
    try {
      if (!navigator.clipboard) return false;
      await navigator.clipboard.writeText(text);
      return true;
    } catch { return false; }
  }
  $('copy-link').addEventListener('click', async () => {
    if (await copyText($('generated-link').value)) {
      $('copy-status').textContent = '초대 링크를 복사했어요!';
    } else {
      $('generated-link').focus();
      $('generated-link').select();
      $('copy-status').textContent = '복사를 허용하지 않는 환경이에요. 선택된 링크를 직접 복사해 주세요.';
    }
  });
  document.querySelectorAll('[data-command]').forEach(button => {
    button.addEventListener('click', async () => {
      const command = button.dataset.command;
      const ok = await copyText(command);
      $('command-feedback').textContent = ok
        ? `${command} 명령어를 복사했어요. 디스코드에서 입력해 주세요.`
        : `디스코드에서 ${command} 명령어를 입력해 주세요.`;
    });
  });
})();
