import React from 'react';
import '../general.css';

const ContactInfo = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-start bg-[#17252a] rounded-lg text-white p-6 md:p-10 space-y-8 md:space-y-0">
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold anime-font text-[#af3a40] tracking-wider">CONTACT INFO</h2>
        <div>
          <p className="text-lg font-semibold ">ADDRESS</p>
          <p>Birla Institute of Technology Patna, Bihar 800014, India</p>
        </div>

        <div>
          <p className="text-lg font-semibold">PHONE</p>
          <p>+91 8252624667</p>
        </div>

        <div>
          <p className="text-lg font-semibold">EMAIL</p>
          <p>technika@bitmesra.ac.in</p>
        </div>
      </div>

      <div className="md:w-1/2 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61485.217254524214!2d85.02673791862922!3d25.607190351835627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57e9cdad8b55%3A0xb6416f459e4204d2!2sBirla%20Institute%20of%20Technology%2C%20Patna!5e0!3m2!1sen!2sin!4v1728028005743!5m2!1sen!2sin"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
          className="border border-gray-300"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactInfo;
