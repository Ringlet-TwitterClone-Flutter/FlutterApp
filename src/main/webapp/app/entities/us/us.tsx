import React, { useState, useEffect, forwardRef } from 'react';

export const Post = () => {
  return (
    <div>
      <h1 id="about-us-header">About Us</h1>
      <h2 id="flutter-team">The Flutter Team</h2>

      <div className="team-member-container">
        <div className="team-header">
          <div className="team-name">James Jang</div>
          <div className="pronouns">He/Him</div>
        </div>
        <div className="team-member-role">Full Stack Software Developer</div>
        <div className="team-intro">
          Prior to Flutter, James was in the food service industry where he managed a supermarket. He recieved his bachelor's degree in
          Management Information Systems from the University of Delaware. After implementing new systems and products into the business,
          James decided it was time to break out of the cycle and continue on his original path. James is a team builder, experienced with
          management and proud member of the Flutter Team.
        </div>
        <br />
        <a href="https://github.com/JamesJang-2jz">James' Github</a>
        <br />
        <a href="https://www.linkedin.com/in/james-jang13/">Connect with James on LinkedIn!</a>
      </div>

      <div className="team-member-container">
        <div className="team-header">
          <div className="team-name">Jacob Ciaffi</div>
          <div className="pronouns">He/Him</div>
        </div>
        <div className="team-member-role">Full Stack Software Developer</div>
        <div className="team-intro">
          Jacob Ciaffi is in the United States Marine Reserve. Prior to Flutter, he spent 4 years in manufacturing where he was entrusted to
          do quality inspections on all production, which was valued at over $80k. When Jacob caught wind that Military One Source was
          looking for marines to apply to Zip Code Wilmington, he jumped at the opportunity to transition into software development where he
          could utilize his love for identifying and solving problems.
        </div>
        <br />
        <a href="https://github.com/Ciaffi-Jacob">Jacob's Github</a>
        <br />
        <a href="https://www.linkedin.com/in/jacobciaffi/">Connect with Jacob on LinkedIn!</a>
      </div>

      <div className="team-member-container">
        <div className="team-header">
          <div className="team-name">Anastasia Epifanova</div>
          <div className="pronouns">She/Her</div>
        </div>
        <div className="team-member-role">Full Stack Software Developer</div>
        <div className="team-intro">
          Prior to Flutter, Anastasia was a Medical Records and Quality Assurance Coordinator and an Assembler for a global supplier of
          ophthalmic surgery specialty laser equipment. With a background as an artist, she has been able to utilize her artistic abilities
          to create visually appealing user interfaces and to create innovative solutions in the tech industry.
        </div>
      </div>
      <br />
      <br />
      <a href="https://github.com/orgs/Ringlet-TwitterClone-Flutter/people/AnastasiaE3">Anastasia's Github</a>
      <br />
      <a href="https://www.linkedin.com/in/epifanova-anastasia-nastya/">Connect with Anastasia on LinkedIn!</a>

      <div className="team-member-container">
        <div className="team-header">
          <div className="team-name">Nina McNair</div>
          <div className="pronouns">She/They</div>
        </div>
        <div className="team-member-role">Full Stack Software Developer</div>
        <div className="team-intro">
          Prior to Flutter, Nina recieved her bachelor's degree in Government and Public Policy before beginning her career in security.
          After handling a bank robbery, she received a promotion leading to her working directly down the street from Zip Code Wilmington.
          She found herself spending a lot of time on tedious tasks that she wanted to automate, but she didn't know where to start. That
          itch to develop solutions through technology sparked her interest in Zip Code and led her down the rabbithole of software
          development. Since then she has been hooked.
          <br />
          <br />
          Now, as a valued member's of the Flutter Team, they are able to put the skills that they acquired from their time at Zip Code to
          use. Those skills include Java, JavaScript, TypeScript, React, Angular, Spring and Spring Boot, Git, TDD, Maven and J-Unit, HTML,
          CSS, BootStrap, MySQL and Agile Methodologies.
          <br />
          <br />
          <a href="https://github.com/NinaEmiko">Nina's Github</a>
          <br />
          <a href="https://www.linkedin.com/in/nina-mcnair/">Connect with Nina on LinkedIn!</a>
        </div>
      </div>
    </div>
  );
};

export default Post;
