import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble, BsDiscord } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Blog 
              </span>
              Blast
            </Link>
          </div>
          <div className=' gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='Follow us' />
              <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://facebook.com' icon={BsFacebook}/>
            <Footer.Icon href='https://instagram.com' icon={BsInstagram}/>
            <Footer.Icon href='https://twitter.com' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com' icon={BsGithub}/>
            <Footer.Icon href='https://discord.com' icon={BsDiscord}/>

          </div>
          </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Blog  Blast"
            year={new Date().getFullYear()}
          />
          
        </div>
      </div>
    </Footer>
  );
}
