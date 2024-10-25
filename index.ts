import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("resourceGroup", {
    location: "swedencentral",
});

// Create an Azure resource (Storage Account)
const storageAccount = new storage.StorageAccount("sa", {
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    sku: {
        name: storage.SkuName.Standard_LRS,
    },
    kind: storage.Kind.StorageV2,
});

// Export the primary key of the Storage Account
const storageAccountKeys = storage.listStorageAccountKeysOutput({
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name
});

const staticWebsite = new storage.StorageAccountStaticWebsite("staticWebsite", {
   accountName: storageAccount.name,
   resourceGroupName: resourceGroup.name,
   indexDocument: "index.html",
});


export const primaryStorageKey = storageAccountKeys.keys[0].value;
export const resourceName = resourceGroup.name;
