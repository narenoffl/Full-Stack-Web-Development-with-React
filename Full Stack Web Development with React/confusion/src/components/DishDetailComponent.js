import React from "react";
import CommentForm from "./CommentFormComponent";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDishDetail({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) trnslateY(-50%)"
        }}>
      <Card>
        <CardImg width="100%" object src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
      </FadeTransform>
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
    <Fade in>
    <Comment detail={detail} formatDate={formatDate} />
    </Fade>
  ));
}
function RenderAllComments({ comments, postComment, dishId }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <h3>Comments</h3>

      <ul style={{ listStyleType: "none", padding: "0" }}>
        <Stagger in>
        <Comments comments={comments} />
        </Stagger>
      </ul>
      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  );
}

const DishDetail = props => {
  if(props.isLoading) {
    return(
     <div className="container">
       <div className="row">
         <Loading />
       </div>
     </div>
    );
  }
  
  else if (props.errMess) {
    return(
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
     );
  }
  
  else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <br />
          </div>
        </div>
        <div className="row">
          <RenderDishDetail dish={props.dish} />
          <RenderAllComments comments={props.comments}
             postComment={props.postComment}
             dishId={props.dish.id} />
        </div>
      </div>
    );
  }
   else return <div></div>;
};

export default DishDetail;