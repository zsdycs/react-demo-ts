import React from 'react';

class ConfirmForm extends React.PureComponent {
  params = (this.props as any).location.params;
  render() {
    console.log(this.params)
    return (
      <div>ConfirmForm</div>
    );
  }

}

export default ConfirmForm;
