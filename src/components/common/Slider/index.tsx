import React, { useContext, useRef } from 'react';
import './index.css';
import { Avatar, Flex } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { SliderProps } from './index.types';
import Link from 'next/link';
import { SolutionGroupContext } from '../../Solution/SolutionGroup/context';

// const { Link } = Typography;

const scrollValue = 200;

const Slider: React.FC<SliderProps> = ({ items, itemUrlGenerator }) => {
  // const [items, setItems] = useState<string[]>(testItems);
  const tabRef = useRef<HTMLUListElement>(null);
  const leftArrowRef = useRef<HTMLDivElement>(null);
  const rightArrowRef = useRef<HTMLDivElement>(null);
  const { state } = useContext(SolutionGroupContext);

  if (!items || items.length === 0) {
    items = [{ id: 'default-id', name: 'No Tag' }];
  }

  const handleScrollLeft = (scrolledLeft: number) => {
    if (leftArrowRef.current) {
      leftArrowRef.current.classList.toggle('hide', scrolledLeft <= 1);
    }

    if (rightArrowRef.current && tabRef.current) {
      const { clientWidth, scrollWidth } = tabRef.current;
      const calculatedScrollLeft = scrollWidth - (clientWidth + scrolledLeft);
      rightArrowRef.current.classList.toggle('hide', calculatedScrollLeft <= 1);
    }
  };

  return (
    <>
      <div className={'slider'}>
        {/* left arrow */}
        <div
          ref={leftArrowRef}
          className="icon hide"
          onClick={() => {
            if (tabRef.current) {
              tabRef.current.scrollLeft -= scrollValue;
            }
          }}
        >
          <span className="left-arrow">&lt;</span>
        </div>

        {/* tab content */}
        <ul
          ref={tabRef}
          className="tabs"
          onScroll={(e) => {
            handleScrollLeft(e.currentTarget.scrollLeft);
          }}
          onWheel={(e) => {
            if (tabRef.current) {
              tabRef.current.scrollLeft += e.deltaY;
            }
          }}
        >
          {items.map(({ name, avatar, id }) => (
            <li
              key={id}
              className="tab"
              onClick={(e) => {
                if (tabRef.current) {
                  tabRef.current
                    .querySelector('.active')
                    ?.classList.remove('active');
                }
                e.currentTarget.classList.add('active');
                e.currentTarget.scrollIntoView({ inline: 'center' });
              }}
            >
              <Link
                href={itemUrlGenerator ? itemUrlGenerator(id) : '#'}
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
                target={state.isWidget ? '_blank' : '_self'}
              >
                <Flex
                  justify={'center'}
                  align={'center'}
                  style={{ height: '100%' }}
                >
                  {avatar && (
                    <Avatar
                      src={avatar}
                      size={'small'}
                      icon={<CheckOutlined />}
                    />
                  )}
                  <span style={{ marginLeft: '0.45rem' }}>{name}</span>
                </Flex>
              </Link>
            </li>
          ))}
        </ul>

        {/* right arrow */}
        <div
          ref={rightArrowRef}
          className="icon"
          onClick={() => {
            if (tabRef.current) {
              tabRef.current.scrollLeft += scrollValue;
            }
          }}
        >
          <span className="right-arrow">&gt;</span>
        </div>
      </div>
    </>
  );
};

export default Slider;
