import ClockContainer from '../containers/ClockContainer';

export default function () {
  const clockContainer = ClockContainer();

  const wrapper = document.getElementById('wrapper');
  wrapper.innerHTML = clockContainer;
}
