import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faBullseye, faHeart } from '@fortawesome/free-solid-svg-icons';

// Data for our values section - easy to update
const values = [
  {
    icon: faEye,
    title: 'Our Vision',
    description: 'To seamlessly blend cutting-edge technology with everyday style, creating apparel that empowers you for the modern world.',
  },
  {
    icon: faBullseye,
    title: 'Our Mission',
    description: 'To design and deliver high-quality, functional, and aesthetically superior techwear that stands the test of time.',
  },
  {
    icon: faHeart,
    title: 'Our Passion',
    description: 'We are passionate about innovation, meticulous craftsmanship, and building a community that shares our love for forward-thinking design.',
  },
];

// Data for team members
const teamMembers = [
  {
    name: 'Alex Mercer',
    title: 'Founder & Lead Designer',
    imageUrl: 'data:image/jpeg;base64,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',
  },
  {
    name: 'Jasmine Ito',
    title: 'Head of Operations',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOCvy89VTcIKsAX5mA9C9IKZCE4WGRzxnafQ&s'
},
  {
    name: 'Ryan Chen',
    title: 'Marketing Director',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGZJ2pgLrG68y0XHPnLnYVxN_1eY7sjHY6wg&s',
  },
];

const AboutPage = () => {
  return (
    <div className="bg-bg">
      {/* Hero Section */}
      <div className="bg-surface text-center py-20">
        <div className="container max-w-4xl mx-auto px-5">
          <h1 className="text-5xl font-bold text-text mb-4">About AURA</h1>
          <p className="text-lg text-muted">
            We are more than just a brand. We are a vision of the future, woven into the fabric of today.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="container max-w-7xl mx-auto px-5 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div key={value.title} className="bg-surface p-8 rounded-2xl text-center border border-transparent transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-2">
              <FontAwesomeIcon icon={value.icon} className="text-accent text-4xl mb-4" />
              <h2 className="text-2xl font-bold text-text mb-2">{value.title}</h2>
              <p className="text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="bg-surface py-20">
        <div className="container max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12">Meet The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <img src={member.imageUrl} alt={member.name} className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-border" />
                <h3 className="text-xl font-bold text-text">{member.name}</h3>
                <p className="text-accent">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container max-w-7xl mx-auto px-5 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join the Future?</h2>
        <p className="text-muted mb-8">Explore our collections and find your new look.</p>
        <Link to="/shop" className="bg-accent text-bg font-bold uppercase tracking-wider py-3 px-8 rounded-lg transition-opacity hover:bg-opacity-80">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;