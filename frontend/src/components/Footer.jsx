import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

function Footer() {
  return (
    <section className="relative overflow-hidden py-6 bg-gray-800 border-t-2 border-gray-700 text-gray-300">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-4 justify-between items-center">
          <div className="w-full p-4 md:w-1/3 text-center md:text-left">    
            <h3 className="text-lg font-semibold text-white">DevLog</h3>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} DevLog. All Rights Reserved.
            </p>
          </div>
          <div className="w-full p-4 md:w-2/3 flex justify-center md:justify-end space-x-6">
            <Link to="https://linkedin.com" className="hover:text-white" target="_blank">
              <FaLinkedin size={24} />
            </Link>
            <Link to="https://github.com" className="hover:text-white" target="_blank">
              <FaGithub size={24} />
            </Link>
            <Link to="https://leetcode.com" className="hover:text-white" target="_blank">
              <SiLeetcode size={24} />
            </Link>
            <Link to="/contact" className="hover:text-white">
              <FaEnvelope size={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
