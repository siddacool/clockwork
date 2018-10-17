import Frame from '../components/Frame';

export default function () {
  const frame = new Frame();

  return `
    <div class="clock-container">
      ${frame.Render()}
    </div>
  `;
}
