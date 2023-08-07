import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loading = () => {
    const icon = <LoadingOutlined />

  return (
    <div className='loader'>
        <Spin size='large' indicator={icon} />
    </div>
  )
}
export default Loading