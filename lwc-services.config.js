module.exports = {
    resources: [{ from: 'src/resources/', to: 'server/dist/resources/' },
    {
        from: 'node_modules/@salesforce-ux/design-system/assets',
        to: 'server/dist/SLDS'
        }
   ]
 };