import Tabs from '@/components/Tabs';
import Verify from './Verify';
import Tip from './Tip';

const items = [
  {
    id: 1,
    title: 'Tip',
    children: <Tip />,
  },
  {
    id: 2,
    title: 'Verify',
    children: <Verify />,
  },
];

const GHOTab: React.FC = () => {
  return (
    <Tabs
      items={items}
      defaultActiveId={1}
      type="card"
      navClassName="h-[43px]"
    />
  );
};

export default GHOTab;
