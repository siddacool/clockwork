import Clock from '../components/Clock';

export default function () {
  const clock = new Clock();

  return `
    <div class="clock-container">
      ${clock.Render()}
    </div>
  `;
}
