import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDishDetail({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg width="100%" object src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
function Comment({ detail, formatDate }) {
  return (
    <li key={detail.id}>
      --{detail.author}&nbsp;,&nbsp;{formatDate(detail.date)}
      <br />
      {detail.comment}
      <br />
      <br />
    </li>
  );
}
function Comments({ comments }) {
  const formatDate = date => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date(date));
  };
  return comments.map(detail => (
    <Comment detail={detail} formatDate={formatDate} />
  ));
}
function RenderAllComments({ comments }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <h3>Comments</h3>

      <ul style={{ listStyleType: "none", padding: "0" }}>
        <Comments comments={comments} />
      </ul>
    </div>
  );
}

const DishDetail = props => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <RenderDishDetail dish={props.dish} />
          <RenderAllComments comments={props.dish.comments} />
        </div>
      </div>
    );
  } else return <div></div>;
};

export default DishDetail;