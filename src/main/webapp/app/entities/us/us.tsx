import React, { useState, useEffect, forwardRef } from 'react';

export const Post = () => {
  return (
    <div>
      <h1 id="about-us-header">About Us</h1>
      <h2>The Flutter Team</h2>
      <h4 className="team-name">James Jang</h4>
      <div className="pronouns">He/Him</div>
      <div className="team-intro">Prior to Flutter, James...</div>
      <h4 className="team-name">Jacob Ciaffi</h4>
      <div className="pronouns">He/Him</div>
      <h4 className="team-name">Anastasia Epifanova</h4>
      <div className="pronouns">She/Her</div>
      <h4 className="team-name">Nina McNair</h4>
      <div className="pronouns">She/They</div>
      <div className="team-intro">
        Prior to Flutter, Nina was in security. After handling a bank robbery, she received a promotion leading to her working directly down
        the street from Zip Code Wilmington. She found herself spending a lot of time on tedious tasks, that could have easily been
        automated. She would then look up and see flyers and banners for Zip Code, telling her that she could learn to do just that. Over
        time she went from saying things like, "I wish there was an app for this.. I wish there was a program that could do that.." to
        saying, "I'm going to be the one to make it." It was that change in mindset that led her down the rabbithole of software
        development, and she has been hooked ever since.
        <br />
        <br />
        Now, as a valued member of the Flutter Team, she is able to put those skills that she has acquired from her time at Zip Code to use.
        Those skills include Java, JavaScript, TypeScript, React, Angular, Spring and Spring Boot, Git, TDD, Maven and J-Unit, HTML, CSS,
        BootStrap and MySQL.
      </div>
    </div>
  );
};

export default Post;
