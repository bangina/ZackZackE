import { Button, Card, List } from "antd";
import React from "react";
import PropTypes, { object } from "prop-types";
import { StopOutlined } from "@ant-design/icons";

const FollowList = ({ data, header }) => {
  // 아래 속성에 넣은 객체들은 모두 최적화를 해줘야 한다!(시간상 그냥 이렇게 작성한 것)
  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>Load More</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(object).isRequired,
};

export default FollowList;
