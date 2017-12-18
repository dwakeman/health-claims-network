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
 * @param {org.acme.claim.lifecycle.SubmitClaim} claim - the prescription
 * @transaction
 *
  o String identifier
  o String type
  o ClaimStatus status
  o ClaimUse use
  o String patientId
  o String memberId
  o String relationshipToMember
  o String providerId
  o DateTime created
  o Diagnosis[] diagnosis
  o Procedure[] procedure
 */
function submitClaim(claimTxn) {

    //at some point there could be validtion logic here to make sure the total is correct, based on the items in the claim
    
    return getAssetRegistry('org.acme.claim.lifecycle.Claim')
    .then(function(claimRegistry){
        var factory = getFactory();
        var claim = factory.newResource('org.acme.claim.lifecycle', 'Claim', claimTxn.identifier);
        claim.type = claimTxn.type;
        claim.status = claimTxn.status;
        claim.use = claimTxn.use;
        claim.patientId = claimTxn.patientId;
        claim.memberId = claimTxn.memberId;
        claim.relationshipToMember = claimTxn.relationshipToMember;
        claim.providerId = claimTxn.providerId;
        claim.created = claimTxn.created;
        claim.diagnosis = claimTxn.diagnosis;
        claim.procedure = claimTxn.procedure;
        claim.item = claimTxn.item;
        claim.total = claimTxn.total;


        // emit a ClaimSubmitted event
        var claimSubmittedEvent = factory.newEvent('org.acme.claim.lifecycle', 'ClaimSubmitted');
        claimSubmittedEvent.identifier = claim.identifier;
        claimSubmittedEvent.type = claim.type;
        claimSubmittedEvent.status = claim.status;
        claimSubmittedEvent.use = claim.use;
        claimSubmittedEvent.patientId = claim.patientId;
        claimSubmittedEvent.memberId = claim.memberId;
        claimSubmittedEvent.relationshipToMember = claim.relationshipToMember;
        claimSubmittedEvent.providerId = claim.providerId;
        claimSubmittedEvent.created = claim.created;
        claimSubmittedEvent.procedure = claim.procedure;
        claimSubmittedEvent.diagnosis = claim.diagnosis;
        claimSubmittedEvent.item = claim.item;
        claimSubmittedEvent.total = claim.total;
        emit(claimSubmittedEvent);

        return claimRegistry.add(claim);
    })




}