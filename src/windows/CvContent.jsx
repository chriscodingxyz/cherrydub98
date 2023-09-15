import React from "react";
// import Cvclean from "../../../public/cv/cvclean";

export default function CvContent() {
  return (
    // <div>
    //   <Cvclean />
    // </div>
    <div
      className="bg-white p-4 text-black border-l border-t border-gray-500"
      style={{
        height: "75vh",
        overflow: "auto",
        fontFamily: "RobotoMonoMedium",
        fontSize: "10px",
        color: "black",
      }}
    >
      <div className="flex flex-col flex-wrap">
        <p className="font-bold text-4xl">Chris Wisniewski</p>
        <p>LONDON</p>
        <p>07596 414 717</p>
        <p>
          <a
            className="font-bold text-blue-600"
            href="mailto:chriscoding@icloud.com"
          >
            chriscoding@icloud.com
          </a>
        </p>
        <p className="inline text-right">
          <a
            className="font-bold text-blue-600"
            href="https://github.com/cherrydub"
            target="_blank"
          >
            <img
              className="inline"
              src="/cv/images2/image9.png"
              alt=""
              width={"15px"}
            />{" "}
            GitHub
          </a>
          <a
            className="font-bold text-blue-600"
            href="https://www.linkedin.com/in/wisniewskichris/"
            target="_blank"
          >
            <img
              className="inline"
              src="/cv/images2/image5.png"
              alt=""
              width={"15px"}
            />{" "}
            LinkedIn
          </a>
          <a
            className="font-bold text-blue-600"
            href="https://www.cherrydub.com"
            target="_blank"
          >
            <img
              className="inline"
              src="/cv/images2/image1.png"
              alt=""
              width={"15px"}
            />{" "}
            Homepage
          </a>
        </p>
        <br />
        <p>
          As an experienced IT consultant with a client-centered approach, I am
          highly enthusiastic about programming and dedicated to delivering
          exceptional results. Through my previous work experience and personal
          interests, I have gained extensive expertise in managing diverse
          systems and overseeing company structures, both hardware and software.
          I am known for my exceptional attention to detail and strong
          communication skills, which allow me to ensure outstanding user
          experiences. I am particularly interested in web development roles, as
          I am driven to create products that are user-friendly and effective.
          My enthusiasm for programming and focus on delivering high-quality
          results make me well-suited for any tech-oriented position. I look
          forward to expanding my programming knowledge and experience
        </p>
        <br />
        <p>
          <span className="font-bold underline text-lg">Skills</span> - HTML -
          CSS - JAVASCRIPT - NODE.JS - JEST | POSTGRESQL - EXPRESS | REACT -
          TAILWIND | GIT - GITHUB
        </p>
        <p>Currently getting familiar with: DART - FLUTTER | TYPESCRIPT</p>

        <br />
        <p className="font-bold underline  text-lg">Projects</p>
        <ul>
          <li className="">
            <a
              className="inline font-bold text-blue-600"
              href="https://www.cherrydub.com/"
              target="_blank"
            >
              <img
                className="inline"
                src="/cv/images2/image1.png"
                alt=""
                width={"15px"}
              />
              Personal Website
            </a>
            - Windows98 themed personal site to show my CV, projects, social
            links etc
          </li>

          <li className="">
            <a
              className="inline font-bold text-blue-600"
              href="https://smartbrain.cherrydub.com/"
              target="_blank"
            >
              <img
                className="inline"
                src="/cv/images2/image1.png"
                alt=""
                width={"15px"}
              />
              Face Recognition
            </a>
            - Using Clarifi API for face detection, will outline matches using
            AI
          </li>

          <li className="inlne">
            <a
              className="inline font-bold text-blue-600"
              href="https://northcoders.com/projects/may-2023/blocklist"
              target="_blank"
            >
              <img
                className="inline"
                src="/cv/images2/image1.png"
                alt=""
                width={"15px"}
              />
              Blocklist
            </a>
            - Mobile application for interactive task management
          </li>

          <li className="">
            <a
              className="inline font-bold text-blue-600"
              href="https://popcorntime.cherrydub.com/"
              target="_blank"
            >
              <img
                className="inline"
                src="/cv/images2/image1.png"
                alt=""
                width={"15px"}
              />
              Popcorn Time
            </a>
            - Public API to display movies, add movies using LocalStorage,
            reusable components
          </li>

          <li className="">
            <a
              className="inline font-bold text-blue-600"
              href="https://crypto1.cherrydub.com/"
              target="_blank"
            >
              <img
                className="inline"
                src="/cv/images2/image1.png"
                alt=""
                width={"15px"}
              />
              Crypto Tracker
            </a>
            - Live crypto app fetching data from CoinGecko
          </li>
        </ul>
        <br />
        <p className="font-bold underline  text-lg">Experience</p>
        <p className="italic">FEB 2023 - MAY 2023</p>
        <p className="font-bold">Northcoders - Web Development</p>
        <p>
          - Northcoders is an immersive 13-week bootcamp designed to equip
          aspiring tech professionals with the skills and knowledge they need to
          succeed in web development. With a focus on progressive learning, the
          program is packed with daily tasks, mini-projects, and
          portfolio-worthy material that challenges and inspires students every
          step of the way
        </p>
        <p>
          - Personally, I found the education to be intense and rewarding, with
          a comprehensive curriculum and a hands-on learning approach that
          provided practical experience in web development. The knowledgeable
          teachers and tutors were always available to offer guidance and
          support, helping me to build a strong portfolio and gain valuable
          insights on how to learn more efficiently
        </p>
        <p>
          - Thanks to Northcoders, I now feel fully job-ready and confident in
          my ability to tackle complex web development challenges. The
          experience has been transformative, not just in terms of my technical
          skills, but also in terms of my mindset and approach to learning. I
          would highly recommend this bootcamp to anyone looking to break into
          the tech industry and make a meaningful impact
        </p>
        <br />
        <p className="italic">JULY 2018 - OCT 2022</p>
        <p className="font-bold">Mac-Seven - IT Consultant</p>
        <p>
          -Worked as an IT consultant with a range of clients across various
          industries
        </p>
        <p>
          -Gained valuable experience with Mac-Seven, a leading managed service
          provider serving diverse clients including schools and businesses
        </p>
        <p>
          -Provided remote IT support and managed a wide range of systems,
          including Windows and Mac machines, and oversaw server, firewall,
          hardware, and software maintenance
        </p>
        <p>
          -Developed an extensive knowledge of various company setups and
          acquired a comprehensive understanding of the intricacies of IT
          management
        </p>
        <p>-Honed skills in managing and troubleshooting IT issues</p>
        <p>
          -Confident in leveraging expertise to make valuable contributions to
          any tech role
        </p>
        <br />
        <p className="font-bold underline  text-lg">Education</p>
        <p className="italic">SEPT 2007 - JUNE 2011</p>
        <p className="font-bold">
          Stevens Institute of Tech, New Jersey USA - Mechanical Engineering
        </p>
        <p>
          -Throughout my life I always enjoyed/excelled in math and wanted to
          pursue a career that would highlight my strengths
        </p>
        <br />
        <p className="italic">SEPT 2003 - JUNE 2007</p>
        <p className="font-bold">Linden High School, New Jersey USA</p>
      </div>
    </div>
  );
}

// import React from "react";

// export default function CvContent() {
//   return (
//     // <div className="w-full h-full">
//     <div className="bg-white">
//       <iframe
//         // className="w-full h-full"
//         src="/cv/cv2.html"
//         frameBorder="0"
//         style={{ height: "75vh", overflow: "auto" }}
//       />
//     </div>
//     // </div>
//   );
// }
