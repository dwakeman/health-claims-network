/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /**
 *
 * @param {composer.base.SetupDemo} setupDemo
 * @transaction
 */
function setupDemo(setupDemo) {
    var factory = getFactory();
    var clmNS = 'org.acme.claim.lifecycle';
    var baseNS = 'composer.base';


    // Create some Providers

    var providers = [
        factory.newResource(clmNS, 'Provider', 'PROVIDER_1'),
        factory.newResource(clmNS, 'Provider', 'PROVIDER_2'),
        factory.newResource(clmNS, 'Provider', 'PROVIDER_3')
    ]

    // need to add an address and a location name

    var addresses = [
        factory.newConcept(baseNS, 'Address'),
        factory.newConcept(baseNS, 'Address'),
        factory.newConcept(baseNS, 'Address')
    ]

    // address for Provider 1
    addresses[0].address1 = '2396 Grand Ave.';
    addresses[0].address2 = '';
    addresses[0].city = 'Des Moines';
    addresses[0].state = 'IA';
    addresses[0].zipCode = '50265';

    // address for Provider 2
    addresses[1].address1 = '123 State Street';
    addresses[1].address2 = '';
    addresses[1].city = 'Chicago';
    addresses[1].state = 'IL';
    addresses[1].zipCode = '60603';

    // address for Provider 3
    addresses[2].address1 = '392 Golf Rd.';
    addresses[2].address2 = '';
    addresses[2].city = 'Schaumburg';
    addresses[2].state = 'IL';
    addresses[2].zipCode = '60168';

    locationNames = ['Unity Point Clinic', 'Cook County Hospital', 'Schaumburg Quick Care Clinic']

    return getParticipantRegistry(clmNS + '.Provider')
    .then(function(providerRegistry){
        providers.forEach(function(provider, index){
            provider.address = addresses[index];
            provider.locationName = locationNames[index];
        })
        return providerRegistry.addAll(providers);

    })

}