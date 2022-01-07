import { Disclosure } from '@headlessui/react'
import { HiChevronUp } from 'react-icons/hi'

export default function Closure() {
  return (
     <div className="flex lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
      <div className="w-full">
      <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>How secure are online transactions ?</span>
                <HiChevronUp
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Online transactions from any reputable vendor are also protected by SSL certificates 
                (to protect data in transit), firewalls, and regular systems scans. Furthermore,
                consumers are empowered to add extra security layers to online transactions.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>I do not see the order in my account. What should I do?</span>
                <HiChevronUp
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                 <p>You may have checked out as a guest. To claim an order you purchased as a guest: </p>
                <ol class="wt-list wt-text-body-01">
                    <li>Open your email inbox.</li>
                    <li>Locate the email receipt you received when you placed your order. This email is sent from info@lenx.co.uk</li>
                    <li>Click the order number in the first line of your receipt.</li>
                    <li>Follow the steps to sign in or create an LENX account.</li>
                    <li>Your order is automatically connected to your new LENX account.</li>
                    </ol>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
               <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>How can I return an item?</span>
                <HiChevronUp
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <p>
                    If you’re unsatisfied with an order,
                     you may be able to return or exchange your 
                     order depending on the shop’s policies. To request a return, return label, 
                     or exchange, contact the shop.
                </p>
                <br/>

                <p>
                    For more information on returns and exchanges, please visit the Help Centre
                </p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
    <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span> My order was market as delivered but I did not receive it </span>
                <HiChevronUp
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <p>If your order is delivered but you haven’t actually received the item, there are a few things you can do.</p>
                <ol>
                    <li>
                        Check with neighbours to see if the package was delivered to them accidentally.
                    </li>
                    <li>
                        Contact your local post office for help locating the package. 
                        Provide them with the tracking number, delivery service name, and your delivery address. 
                        You may have to reach out to the seller to get some of these details.
                    </li>
                    <li>
                        Ask the seller if they’ll assist you by opening a claim with the delivery service.
                    </li>
                </ol>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>How can I check the status of my order?</span>
                <HiChevronUp
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                
                <p><b>The easiest way to review your order information is to log into your account. To check the status of your order, please see below:</b></p>

                <p><em>Note:&nbsp;If you checked out as a guest you can track your order as well as start a return just by filling out the “Track My Order” form at the top of this webpage.</em></p>

                <p><em>Due to unforeseen circumstances, we are experiencing delays with final delivery. Please allow an additional 2 business days from the time of your original estimated arrival date for final delivery.</em></p>
                <table width="100%">
                <tbody>
                <tr>
                <td>If you signed in or created an account when you checked out:</td>
                </tr>
                <tr>
                <td>
                <ol>
                    <li>Sign in to your account by clicking the “My Account” link.</li>
                    <li>After you are logged in, locate “Active Orders” on the left side navigation menu and click&nbsp;<b>[View].</b></li>
                    <li>Locate and click the order number you wish to review.</li>
                    <li>The Order Status will be located under the Order Information Section.</li>
                </ol>
                </td>
                </tr>
                <tr>
                <td>If you checked out as a guest:</td>
                </tr>
                <tr>
                <td>
                <ol>
                <li>Enter the following information into the “Track Order” box on the Account Login page of our site.
            Order Number
            Zip Code (billing address)</li>
                <li>Email Address</li>
                <li>The Order Status will be located under the Order Information Section.</li>
            </ol>
            </td>
            </tr>
            </tbody>
            </table>

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
               <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>How do I cancel an order that I have not received?</span>
                <HiChevronUp
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you choose to cancel an order that was purchased online that you have not yet received, please chat now to one of our helpful colleagues using our Webchat.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}