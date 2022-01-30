import Loader from 'react-loader-spinner';

const style = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: '1200',
};

export default function Spinner() {
  return (
    <>
      <div style={style}>
        <Loader type="Bars" color="#FFF" height={200} width={200} />
      </div>
    </>
  );
}
